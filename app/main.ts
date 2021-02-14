import "./nw";
import { vec2 } from "gl-matrix";
import { example } from "@namespace/example";

import basicVS from "./shaders/basic.vs";
import basicFS from "./shaders/basic.fs";

// Console calls are dropped in production !

console.log(await Promise.resolve("TOP LEVEL AWAIT"));

console.log(example);

console.log(vec2.str(vec2.fromValues(10, 20)));

console.log(basicVS);
console.log(basicFS);

debugger;

// Side effects are retained

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

ctx.fillStyle = "magenta";
ctx.fillRect(0, 0, canvas.width, canvas.height);
