import glslify from "rollup-plugin-glslify";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import ts from "@rollup/plugin-typescript";

import { babel, getBabelOutputPlugin } from "@rollup/plugin-babel";

import { external, source, module, script } from "./rollup.config";

export default [
  {
    input: source,
    external,
    output: {
      file: module,
      format: "esm",
      sourcemap: true,
      sourcemapExcludeSources: true,
      compact: true,
    },
    plugins: [
      glslify({
        compress: true,
      }),
      resolve({
        extensions: [".js", ".ts"],
      }),
      ts({
        rootDir: ".",
      }),
      terser({
        module: true,
        toplevel: false,
        parse: {
          ecma: 11,
        },
        format: {
          wrap_iife: true,
        },
        compress: {
          global_defs: {
            "process.env.NODE_ENV": process.env.NODE_ENV,
          },
          hoist_vars: true,
          drop_console: true,
          drop_debugger: true,
          passes: 3,
          ecma: 11,
        },
        mangle: {
          keep_classnames: false,
          keep_fnames: false,
          properties: {
            builtins: false,
            keep_quoted: true,
            regex: /^[_A-Z][^_A-Z]/,
          },
          safari10: false,
          ie8: false,
        },
      }),
    ],
  },
  {
    input: module,
    output: {
      file: script,
      format: "esm",
      plugins: [
        getBabelOutputPlugin({
          plugins: [
            "babel-plugin-proposal-top-level-await",
            "babel-plugin-async-to-promises",
            "@babel/plugin-transform-modules-umd",
          ],
        }),
      ],
    },
    plugins: [
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-env"],
      }),
      terser({
        compress: true,
        mangle: true,
      }),
    ],
  },
];
