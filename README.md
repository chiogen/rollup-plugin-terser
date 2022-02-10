# rollup-plugin-terser [![Travis Build Status][travis-img]][travis]

> This is a reduced fork of [TrySound/rollup-plugin-terser](https://github.com/TrySound/rollup-plugin-terser)
> - Typescript
> - Removed jest-worker and its dependencies
>
> This plugin is not published yet.


[travis-img]: https://travis-ci.org/TrySound/rollup-plugin-terser.svg
[travis]: https://travis-ci.org/TrySound/rollup-plugin-terser

[Rollup](https://github.com/rollup/rollup) plugin to minify generated es bundle. Uses [terser](https://github.com/fabiosantoscode/terser) under the hood.


## Install

```sh
npm i @chiogen/rollup-plugin-terser --save-dev
```

_Note: this package requires rollup@0.66 and higher (including rollup@2.0.0)_

## Usage

```js
import { rollup } from "rollup";
import { terser } from "rollup-plugin-terser";

rollup({
  input: "main.js",
  plugins: [terser()],
});
```

## Options

> ⚠️ **Caveat:** any function used in options object cannot rely on its surrounding scope, since it is executed in an isolated context.

```js
terser(options);
```

`options` - [terser API options](https://github.com/fabiosantoscode/terser#minify-options)

Note: some terser options are set by the plugin automatically:

- `module: true` is set when `format` is `esm` or `es`
- `toplevel: true` is set when `format` is `cjs`

## Examples

### Using as output plugin

```js
// rollup.config.js
import { terser } from "rollup-plugin-terser";

export default {
  input: "index.js",
  output: [
    { file: "lib.js", format: "cjs" },
    { file: "lib.min.js", format: "cjs", plugins: [terser()] },
    { file: "lib.esm.js", format: "esm" },
  ],
};
```

### Comments

If you'd like to preserve comments (for licensing for example), then you can specify a function to do this like so:

```js
terser({
  format: {
    comments: function (node, comment) {
      var text = comment.value;
      var type = comment.type;
      if (type == "comment2") {
        // multiline comment
        return /@preserve|@license|@cc_on/i.test(text);
      }
    },
  },
});
```

Alternatively, you can also choose to keep all comments (e.g. if a licensing header has already been prepended by a previous rollup plugin):

```js
terser({
  format: {
    comments: "all",
  },
});
```

See [Terser documentation](https://github.com/fabiosantoscode/terser#terser) for further reference.

# License

MIT © [Bogdan Chadkin](mailto:trysound@yandex.ru)
