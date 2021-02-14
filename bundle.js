import { example } from '@namespace/example';

console.clear();

if (globalThis.process && process.env.NODE_ENV !== "production") {
  const { watch } = require("chokidar") ;
  const ignored = /[\/\\]\.|node_modules/;
  const rxExt = /\.(png|ogg|js|html|css|vs|fs|vert|frag|glsl)$/;
  const watcher = watch(".", { ignored }).on("all", (change, file) => {
    if (change === "change" && rxExt.test(file)) {
      watcher.close();
      location.reload();
    }
  });
}

/**
 * Common utilities
 * @module glMatrix
 */
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create() {
  var out = new ARRAY_TYPE(2);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */

function fromValues(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

(function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
})();

var basicVS = "#version 300 es\n#define GLSLIFY 1\n\nlayout(location = 0) in vec3 position;\nlayout(location = 1) in vec2 uv;\nlayout(location = 2) in vec3 normal;\n\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 projection;\n\nout vec2 v_uv;\n\nvoid main() {\n    v_uv = uv;\n    gl_PointSize = 10.0;\n    gl_Position = projection * view * model * vec4(position, 1.0);\n}\n"; // eslint-disable-line

var basicFS = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nin vec2 v_uv;\n\nuniform sampler2D atlas;\n\nout vec4 out_finalColor;\n\nvoid main() {\n    vec4 color = texture(atlas, v_uv);\n    out_finalColor = vec4(color.rgb, 1.0);\n}\n"; // eslint-disable-line

// Console calls are dropped in production !

console.log(await Promise.resolve("TOP LEVEL AWAIT"));

console.log(example);

console.log(str(fromValues(10, 20)));

console.log(basicVS);
console.log(basicFS);

debugger;

// Side effects are retained

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "magenta";
ctx.fillRect(0, 0, canvas.width, canvas.height);
//# sourceMappingURL=bundle.js.map
