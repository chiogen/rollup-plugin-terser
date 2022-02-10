import { MinifyOptions } from "terser";
export declare type Options = Omit<MinifyOptions, 'sourceMap'>;
export default function terser(userOptions?: Options): {
    name: string;
    renderChunk(code: any, chunk: any, outputOptions: any): Promise<import("terser").MinifyOutput>;
};
