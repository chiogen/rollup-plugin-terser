import type { Plugin } from 'rollup';
import { MinifyOptions } from "terser";
export declare type Options = Omit<MinifyOptions, 'sourceMap'>;
export declare function terser(userOptions?: Options): Plugin;
