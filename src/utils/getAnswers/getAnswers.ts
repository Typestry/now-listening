import inquirer, { QuestionCollection } from "inquirer"
import { verifyAuth } from "../../api/auth/verifyAuth/verifyAuth"
import { Messages } from "../../constants/messages"
import { MusicProviders } from "../../constants/musicProviders"
import { Emojis } from "../../constants/emojis"

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
    name: "provider",
    message: Messages.provider_question,
    type: "list",
    choices: Object.values(MusicProviders),
  },
  {
    name: "emoji",
    message: "What emoji would you like to include in your slack status?",
    type: "list",
    choices: Object.values(Emojis),
  },
]

export const getAnswers = () => {
  return inquirer.prompt(questions)
}
