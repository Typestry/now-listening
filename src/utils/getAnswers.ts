import inquirer from "inquirer"
import { verifyAuth } from "../api/auth/verifyAuth.js"

export const getAnswers = () => {
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
