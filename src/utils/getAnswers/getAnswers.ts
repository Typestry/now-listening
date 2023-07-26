import inquirer, { QuestionCollection } from "inquirer"
import { verifyAuth } from "../../api/auth/verifyAuth"
import { Messages } from "../../constants/messages"
import { MusicProviders } from "../../constants/musicProviders"
import { MusicProvider } from "../../types/MusicProvider"

const questions: QuestionCollection = [
  {
    name: "token",
    message: Messages.token_question,
    type: "input",
    validate: async (token: string) => {
      const isValid = await verifyAuth(token)

      if (!isValid) {
        return Messages.invalid_token
      }

      if (!token.length) {
        return Messages.missing_token
      }

      return true
    },
  },
  {
    name: "options",
    message: Messages.provider_question,
    type: "checkbox",
    choices: Object.values(MusicProviders),
    validate: (options: Array<MusicProvider>) => {
      if (!options.length) {
        return Messages.no_option_selected
      }

      if (options.length > 1) {
        return Messages.too_many_options
      }

      return true
    },
  },
]

export const getAnswers = () => {
  return inquirer.prompt(questions)
}
