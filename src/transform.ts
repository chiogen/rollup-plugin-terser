import { minify } from "terser";

export async function transform(code, optionsString) {
  const options = eval(`(${optionsString})`);
  return await minify(code, options);
}
