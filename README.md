# TypeScript Game developement Starter

This a preconfigured mono-repo allowing:

- Fast iterative developement with the help `rollup` and `sucrase`
- Live reload in the browser (via `live-server`) and in nw.js (via `chokidar` and a small module).
- Compress, mangled, wrangled, and tree shaken output for production using `rollup` and `terser`.
- Automatic production build and gh-pages deployement of only the public folder.
- GLSL Shader imports via the `glslify` module.

**NOTE**: No type checking is done in the compilers, so make sure to use and editor with a typescript language server.

## How to start using this repository ?

1. Install [node](https://nodejs.org/en/download/)
2. Clone this repository.
3. Install dev dependancies, and reify local packages, using the following command
   ```bash
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
  $ npm install -g yarn
  $ yarn compile:watch
  ```

## How to use the live server ?

- Using **VSCode**: Run Ctrl+Shift+P, select `Run Task`, select `Run live server`

- Using the **Terminal**:
  ```bash
  $ yarn server
  ```

**NOTE**: This was made with only static websites and nw.js in mind, we might write about advanced scenarios in this explainer.

## How to create a local package ?

Suppose you want to make your local package named `ecs`, to avoid the mess of imports pointing to `"../../../core/ecs"` and use `"@namespace/ecs"`.

the word `@namespace` in the module name is configurable in the root `package.json`, under `name`.

You can use use the following command to make the local package, it will be created in the packages root folder of the repository.

```bash
$ yarn create ecs
$ yarn install
```

**NOTE**: Your editor typescript language server might complain a bit, but few seconds and it will recognize the symlink made by yarn, or reprite the module name it will change it's mind eventually.

## How to use with NW.js with this ?

1. If you will use NW.js visit [this page](https://nwjs.io/) and follow install instructions for your OS.
2. Install `Debugger for NWjs` for **VSCode**
3. Press F5

## Additional tips

### Deploying to a different repo ?

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

### Public build / private history

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

### Limit build trigger to only some repos ?

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
