#!/usr/bin/env node --experimental-specifier-resolution=node
import inquirer from "inquirer"
import { statusTask } from "./utils/statusTask.js"
import { readFileSync, writeFile } from "fs"
import { verifyAuth } from "./utils/verifyAuth.js"
import { MusicProvider } from "./types/MusicProvider.js"
import { Messages } from "./constants/messages.js"
import path from "path"
import { fileURLToPath } from "url"
import { Payload } from "./types/Payload.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FILE_NAME = "config.txt"
const FILE_PATH = `${__dirname}/${FILE_NAME}`
const ENCODING = "utf8"

;(async () => {
  let token = ""
  let provider: MusicProvider = "Music"

  try {
    const response = readFileSync(FILE_PATH, ENCODING)
    const config = JSON.parse(response) as Payload

    token = config.token
    provider = config.provider

    console.log(Messages.read_success)
  } catch (err) {
    const answers = await getAnswers()

    token = answers.token
    provider = answers.options[0]

    const content = JSON.stringify({
      token,
      provider,
    })

    writeFile(FILE_PATH, content, (err) => {
      if (err) {
        console.error(err)
      }
      console.log(Messages.write_success)
    })
  }

  statusTask({ token, provider })
})()

function getAnswers() {
  return inquirer.prompt([
    {
      name: "token",
      message: "What is your slack app token?",
      type: "input",
      validate: async (token: string) => {
        const isValid = await verifyAuth(token)

        if (!isValid) {
          return "Please provide a valid slack token"
        }

        if (!token.length) {
          return "Please provide a token"
        }

        return true
      },
    },
    {
      name: "options",
      message: "Who is your music provider?",
      type: "checkbox",
      choices: ["Music", "Spotify"],
      validate: (options: Array<string>) => {
        if (!options.length) {
          return "Choose at least one of the above, use space to choose the option"
        }

        if (options.length > 1) {
          return "Please select only one option"
        }

        return true
      },
    },
  ])
}
