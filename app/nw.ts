import type * as chokidar from "chokidar";

console.clear();

if (globalThis.process && process.env.NODE_ENV !== "production") {
  const { watch } = require("chokidar") as typeof chokidar;
  const ignored = /[\/\\]\.|node_modules/;
  const rxExt = /\.(png|ogg|js|html|css|vs|fs|vert|frag|glsl)$/;
  const watcher = watch(".", { ignored }).on("all", (change, file) => {
    if (change === "change" && rxExt.test(file)) {
      watcher.close();
      location.reload();
    }
  });
}
