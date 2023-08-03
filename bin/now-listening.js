#! /usr/bin/env node
import { app } from "../dist/app.js"
import { parseArgs } from "../dist/utils/parseArgs.js"

parseArgs().argv
app()
