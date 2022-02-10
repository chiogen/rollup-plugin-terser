import codeFrameColumns from "@babel/code-frame";
import { transform } from "./transform";
export default function terser(userOptions = {}) {
    if ('sourceMap' in userOptions) {
        throw Error("sourceMap option is removed. Now it is inferred from rollup options.");
    }
    return {
        name: "terser",
        async renderChunk(code, chunk, outputOptions) {
            const defaultOptions = {
                sourceMap: outputOptions.sourcemap === true || typeof outputOptions.sourcemap === "string",
            };
            if (outputOptions.format === "es" || outputOptions.format === "esm") {
                defaultOptions.module = true;
            }
            if (outputOptions.format === "cjs") {
                defaultOptions.toplevel = true;
            }
            try {
                const result = await transform(code, { ...defaultOptions, ...userOptions });
                return result.result;
            }
            catch (error) {
                const { message, line, col: column } = error;
                console.error(codeFrameColumns(code, { start: { line, column } }, { message }));
                throw error;
            }
        },
    };
}
