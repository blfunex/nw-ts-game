import { builtinModules } from "module";
import { dependencies, devDependencies } from "./package.json";

import glslify from "rollup-plugin-glslify";
import resolve from "@rollup/plugin-node-resolve";
import sucrase from "@rollup/plugin-sucrase";
import { terser } from "rollup-plugin-terser";

const PRODUCTION = (process.env.NODE_ENV || "").trim() === "production";
const internal = ["gl-matrix"];

const plugins = [
  glslify({
    compress: PRODUCTION,
  }),
  resolve({
    extensions: [".js", ".ts"],
  }),
  // TODO: Investigate better solutions than sucrase for production,
  //       sucrase does not guarantee best JS output for production,
  ///      but since TypeScript +4.0 support is not working properly
  //       I have no choice
  sucrase({
    exclude: ["node_modules/**"],
    transforms: ["typescript"],
  }),
];

if (PRODUCTION) {
  plugins.push(
    terser({
      module: true,
      toplevel: false,
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
        ecma: 5,
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
    })
  );
}

export default [
  {
    input: "app/main.ts",
    external: ["nw.gui"].concat(
      builtinModules,
      devDependencies ? Object.keys(devDependencies) : [],
      dependencies
        ? Object.keys(dependencies).filter(
            module => !internal.includes(module)
          )
        : []
    ),
    output: {
      file: "public/bundle.js",
      format: "es",
      sourcemap: !PRODUCTION,
      compact: PRODUCTION,
    },
    plugins,
  },
];
