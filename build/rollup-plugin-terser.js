import codeFrameColumns from "@babel/code-frame";
import { minify } from "terser";
const OPTION_MODULE_FORMATS = ['es', 'esm'];
export function terser(userOptions = {}) {
    if ('sourceMap' in userOptions) {
        throw Error("sourceMap option is removed. Now it is inferred from rollup options.");
    }
    return {
        name: "terser",
        async renderChunk(code, _chunk, outputOptions) {
            const options = configure(userOptions, outputOptions);
            try {
                const result = await minify(code, options);
                return {
                    code: result.code,
                    map: result.map
                };
            }
            catch (error) {
                const { message, line, col: column } = error;
                console.error(codeFrameColumns(code, { start: { line, column } }, { message }));
                throw error;
            }
        },
    };
}
function configure(userOptions, outputOptions) {
    const options = {
        sourceMap: outputOptions.sourcemap === true || typeof outputOptions.sourcemap === "string",
        ...userOptions
    };
    if (OPTION_MODULE_FORMATS.includes(outputOptions.format))
        options.module = true;
    if (outputOptions.format === "cjs")
        options.toplevel = true;
    return options;
}
