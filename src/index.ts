import inquirer from "inquirer"
import { statusTask } from "./utils/statusTask"
import { readFileSync, writeFile } from "fs"
import { verifyAuth } from "./utils/verifyAuth"
import { MusicProvider } from "./types/MusicProvider"
import { Messages } from "./constants/messages"

const FILENAME = "config.txt"
const ENCODING = "utf8"

;(async () => {
  let token = ""
  let provider: MusicProvider = "Music"

  try {
    const response = readFileSync(FILENAME, ENCODING)
    const config = JSON.parse(response)

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

    writeFile(FILENAME, content, (err) => {
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
