# TypeScript Game developement Starter

This a preconfigured mono-repo allowing:

- Fast iterative developement with the help `rollup` and `sucrase`
- Live reload in the browser (via `live-server`) and in nw.js (via `chokidar` and a small module).
- Compressed, mangled, wrangled, and tree shaken output for production using `rollup` and `terser`.
- Automatic production build and gh-pages deployement of only the public folder.
- GLSL Shader imports via the `glslify` module.

**NOTE**: No type checking is done in the compilers, so make sure to use and editor with a typescript language server.

<details>

<summary><strong>Production build details</strong></summary>

## Restrictions imposed by Sucrase on TypeScript code

- No namespace or module statements
- Const enums are just treated like simple enums and are preserved
- Simple type stripping.
- JSX is possible

Sucrase is the fastest well maintained ts plugin I could find for Rollup.

I intend to use the TypeScript compiler for production but it seems that version [4.0 ecosystem is not yet fully ready](https://github.com/rollup/plugins/issues/287), using the compiler in the production allows the use of const enums that turn into simple number constants, if I forget this please open an issue alerting me of it, or contribute it I will accept a PR for it.

## About the production build

The code is first compiled by Sucrase from TypeScript to JavaScript is then tree shaken and bundled using Rollup (unused code is striped, virtual namespaces from imports are simplified), Terser then compresses the code striping console calls, debugger statements, and dead debugging code depending on `process.env.NODE_ENV !== "production"`, it then mangles the all variable names, and some property names according to the following RegExp `/^[_A-Z][^_A-Z]/`, meaning that it mangles like  `Render` and `_render`, which corespond to the `C#` convention for `public` and `private` names, but seeing as JavaScript's convention is `render`, it wont be mangled so you can use API by the browser freely, you are free to disable mangling, just comment out the `properties` object in `rollup.config.js`, next it strips code that was left unsused because of the dead code ellimination or because it was used in console calls.

GLSLify plugin is instructed to compress the GLSL code in production, you can disable it in `rollup.config.js` by commenting out the compress boolean in the glslify plugin.

</details>

## How to start using this repository ?

1. Install [node](https://nodejs.org/en/download/)
2. Clone this repository.
3. Install dev dependancies, and reify local packages, using the following command
   ```bash
   $ npm install -g yarn
   $ yarn install
   ```

## How to start your dev environement ?

- Using **VSCode**: (*Only first time you open project*)
  1. Run Ctrl+Shift+P, select `Run Task`, select `Compile code`
  2. Close the task terminal
  3. Accept to allow the task to run automatically next time
    you open the workspace.
  4. Redo the first step to rerun the task

- Using the **Terminal**:
  ```bash
  $ yarn compile:watch
  ```

## How to use with NW.js with this ?

1. If you will use NW.js visit [this page](https://nwjs.io/) and follow install instructions for your OS.
2. Install `Debugger for NWjs` for **VSCode**
3. Press F5

<details>

<summary><strong>How to use the live server ?</strong></summary>

- Using **VSCode**: Run Ctrl+Shift+P, select `Run Task`, select `Run live server`

- Using the **Terminal**:
  ```bash
  $ yarn server
  ```

**NOTE**: This was made with only static websites and nw.js in mind, we might write about advanced scenarios in this explainer.

</details>
<details>

<summary><strong>How to create a local package ?</strong></summary>

Suppose you want to make your local package named `ecs`, to avoid the mess of imports pointing to `"../../../core/ecs"` and use `"@namespace/ecs"`.

the word `@namespace` in the module name is configurable in the root `package.json`, under `name`.

You can use use the following command to make the local package, it will be created in the packages root folder of the repository.

```bash
$ yarn create ecs
$ yarn install
```

**NOTE**: Your editor typescript language server might complain a bit, but few seconds and it will recognize the symlink made by yarn, or reprite the module name it will change it's mind eventually.

</details>

## Additional tips

<details>

<summary><strong>Deploying to a different repo ?</strong></summary>

I am a free github pleb so I can not use gh pages in private repos. The solution is to use a private repo for developement and a public repo for deployment.

1. Go to your account's [personal token settings](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) and generate a personal token, copy that.
2. Paste the token in a secret in your repo's [actions settings](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets) named `PERSONAL_TOKEN`
3. Use the following code in `.github/workflows/gh.yml`:
   ```diff
         - name: Deploy public 🚀
           uses: JamesIves/github-pages-deploy-action@4.0.0
           with:
   +         token: ${{ secrets.PERSONAL_TOKEN }}
   +         repository-name: username/public-repo
             branch: main
             folder: public
   ```
   In `username/public-repo` replace `username` with you own, and `public-repo` is the name of the repo is name of the repo you have to make before pushing these changes.

</details>
<details>

<summary><strong>Public build / private history</strong></summary>

If you want to have a private history of your build, you can deploy and whipe commit history.

In `.github/workflows/gh.yml`

```diff
-     - name: Deploy 🚀
+     - name: Deploy public 🚀
        uses: JamesIves/github-pages-deploy-action@4.0.0
        with:
          token: ${{ secrets.PERSONAL_TOKEN }}
          repository-name: username/public-repo
+         single-commit: true
          branch: gh-pages
          folder: public
+     - name: Deploy history 📚
+       uses: JamesIves/github-pages-deploy-action@4.0.0
+       with:
+         branch: history
+         folder: public
```

</details>
<details>

<summary><strong>Limit build trigger to only some repos ?</strong></summary>

If you use `gitflow`, every branch you push to will trigger the build process.
To limit the actions script to only run on master pushes

```yml
on:
  push:
    branches: master
```

For multiple branches

```yml
on:
  push:
    branches:
      - master
      - develop
```

</details>
