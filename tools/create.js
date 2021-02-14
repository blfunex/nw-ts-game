const { name: project } = require("../package.json");
const { writeFileSync, mkdirSync, existsSync } = require("fs");
const { join } = require("path");

const name = process.argv[process.argv.length - 1];

console.log(name, project);

const folder = join(__dirname, `../packages/${name}`);

if (existsSync(folder)) {
  console.error("\t⛔ Folder already exists aborting\n");
  process.exit(-1);
} else {
  try {
    mkdirSync(folder);
    writeFileSync(join(folder, "index.ts"), "export {}");
    writeFileSync(
      join(folder, "package.json"),
      `{
    "name": "@${project}/${name}",
    "version": "0.0.1"
  }`
    );
  } catch {
    console.error("\t⛔ Error while creating package aborting\n");
    process.exit(-2);
  }
}
