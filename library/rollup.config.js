const cleanup = require("rollup-plugin-cleanup");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");

const outputTemplate = {
    format: "umd",
    name: "DjVu",
    intro: "function DjVuScript() {\n'use strict';",
    outro: "}\nwindow.DjVu = DjVuScript();\nreturn Object.assign(DjVuScript(), {DjVuScript});"
};

module.exports = {
    input: "./src/index.js",
    output: [
        Object.assign({ file: "dist/djvu.js" }, outputTemplate, {
            plugins: [terser()],
        }),
        Object.assign({ file: "../viewer/public/tmp/djvu.js" }, outputTemplate),
        Object.assign({ file: "../extension/dist/djvu.js" }, outputTemplate),
    ],
    plugins: [resolve(), commonjs(), cleanup()],
};
