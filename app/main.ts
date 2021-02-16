import "./nw";
import { vec2 } from "gl-matrix";
import { EXAMPLE } from "@namespace/example";

import basicVS from "./shaders/basic.vs";
import basicFS from "./shaders/basic.fs";

import { ExampleEnum } from "../packages/example";

const message = await Promise.resolve("TOP LEVEL AWAIT");

// Normal stays

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.fillStyle = "magenta";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Console calls are dropped in production !
// Which in turn drops code depending on it.

console.log(message);

console.log(EXAMPLE);

console.log(vec2.str(vec2.fromValues(10, 20)));

console.log(basicVS);
console.log(basicFS);

// Debugger statements are also dropped

debugger;

class Example {
  // Production: `A = ${0} B = ${1} C = ${2}`
  constEnumDemo = `A = ${ExampleEnum.A} B = ${ExampleEnum.B} C = ${ExampleEnum.C}`;

  // Mangling by Terser

  // NOTICE: you can not rely on property names
  //         except if they start with a lowercase,
  //         or they start with __ or are UPPERCASE

  willNotBeMangled() {
    this.ThisWillBeMangled();
    return this.WILL_NOT_MANGLED;
  }

  WILL_NOT_MANGLED = "LOL";

  __neitherWillThis() {
    return message;
  }

  private _willBeMangled() {
    throw "it is private, who needs to know ... pffft";
  }

  ThisWillBeMangled() {
    console.log(`use mangling wisely`);
    this._willBeMangled();
  }
}

const example = new Example();

ctx.font = "32px monospace";
ctx.textAlign = "left";
ctx.textBaseline = "top";

ctx.fillStyle = "black";
ctx.fillText(example.constEnumDemo, 0, 0);
