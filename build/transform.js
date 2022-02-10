import { minify } from "terser";
export function transform(code, optionsString) {
    const options = eval(`(${optionsString})`);
    return minify(code, options).then(result => ({ result, nameCache: options.nameCache }));
}
