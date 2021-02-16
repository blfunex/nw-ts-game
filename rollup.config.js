import { builtinModules } from "module";
import { dependencies, devDependencies } from "./package.json";

import glslify from "rollup-plugin-glslify";
import resolve from "@rollup/plugin-node-resolve";
import sucrase from "@rollup/plugin-sucrase";

import { join } from "path";

export const source = join(__dirname, "app", "main.ts");
export const module = join(__dirname, "public", "bundle.mjs");
export const script = join(__dirname, "public", "bundle.js");

const bundled_modules = ["gl-matrix"];

const nwjs_modules = ["nw.gui"].concat(builtinModules);

const developement_modules = devDependencies
  ? Object.keys(devDependencies)
  : [];

const modules = dependencies ? Object.keys(dependencies) : [];

const external_modules = modules.filter(
  module => !bundled_modules.includes(module)
);

export const external = [
  ...nwjs_modules,
  ...developement_modules,
  ...external_modules,
];

export default [
  {
    input: source,
    external,
    output: {
      file: module,
      format: "esm",
      sourcemap: true,
      compact: false,
    },
    plugins: [
      glslify({
        compress: false,
      }),
      resolve({
        extensions: [".js", ".ts"],
      }),
      sucrase({
        exclude: ["node_modules/**"],
        transforms: [
          "typescript",
          /* "jsx" */
        ],
      }),
    ],
  },
];
