#! /usr/bin/env node
import fs from "fs"
import yargs from "yargs"
import { app } from "../dist/app.js"

yargs(process.argv.slice(2)).command(
  "config",
  "Overwrite current config",
  (yargs) => {
    yargs.positional("config", { default: true, type: "boolean" })
  },
  (args) => {
    if (args.config) {
      fs.writeFileSync("./dist/config.txt", "")
    }
  },
).argv

app()
