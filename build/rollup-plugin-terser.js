"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.terser = void 0;
const code_frame_1 = require("@babel/code-frame");
const terser_1 = require("terser");
const OPTION_MODULE_FORMATS = ['es', 'esm'];
function terser(userOptions = {}) {
    if ('sourceMap' in userOptions) {
        throw Error("sourceMap option is removed. Now it is inferred from rollup options.");
    }
    return {
        name: "terser",
        async renderChunk(code, _chunk, outputOptions) {
            const options = configure(userOptions, outputOptions);
            try {
                const result = await (0, terser_1.minify)(code, options);
                return {
                    code: result.code,
                    map: result.map
                };
            }
            catch (error) {
                const { message, line, col: column } = error;
                console.error((0, code_frame_1.default)(code, { start: { line, column } }, { message }));
                throw error;
            }
        },
    };
}
exports.terser = terser;
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
