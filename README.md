# TypeScript Game developement Starter

This a preconfigured mono-repo allowing:

- Fast iterative developement with the help `rollup` and `sucrase`
- Live reload in the browser (via `live-server`) and in nw.js (via `chokidar` and a small module).
- Compress, mangled, wrangled, and tree shaken output for production using `rollup` and `terser`.
- Automatic production build and gh-pages deployement of only the public folder.
- GLSL Shader imports via the `glslify` module.

**NOTE**: No type checking is done in the compilers, so make sure to use and editor with a typescript language server.

## How to start this repository ?

1. Install [node](https://nodejs.org/en/download/)
2. Clone this repository.
3. Install dev dependancies, and reify local packages, using the following command
   ```bash
   $ npm install
   ```

## How to start dev environement ?

- In **VSCode**: (*Only first time you open project*)
  1. Run Ctrl+Shift+P, select `Run Task`, select `Compile code`
  2. Close the task terminal
  3. Accept to allow the task to run automatically next time
    you open the workspace.
  4. Redo the first step to rerun the task

- Or on your **Terminal**:
  ```bash
  $ npm run compile:watch
  ```

## How to use the live server ?

- In **VSCode**: Run Ctrl+Shift+P, select `Run Task`, select `Run live server`

- Or on your **Terminal**:
  ```bash
  $ npm run server
  ```

**NOTE**: This with only static websites and nw.js in mind, advanced scenarios like proxying a custom backend might be considered in the future.

## How to use with nw.js with this ?

1. If you will use NW.js visit [this page](https://nwjs.io/) and follow instructions for your system.
2. Install `Debugger for NWjs` for **VSCode**
3. Press F5

## How to create a local package ?

Suppose you want to make your local package named `ecs`, to avoid the mess of imports pointing to `"../../../core/ecs"` and use `"@namespace/ecs"`.

the word `@namespace` in the module name is configurable in the root `package.json`, under `name`.

You can use use the following command to make the local package, it will be created in the packages root folder of the repository.

```bash
$ npm run create ecs
$ npm install
```

**NOTE**: Your editor typescript language server might complain if you start using the new module name. give some time it will detect it, I usually help it by retyping again.