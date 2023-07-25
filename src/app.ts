import { Messages } from "./constants/messages"
import { MusicProvider } from "./types/MusicProvider"
import { getAnswers } from "./utils/getAnswers"
import { getCredentials } from "./utils/getCredentials"
import { statusTask } from "./utils/statusTask"
import { writeCredentials } from "./utils/writeCredentials"
import nodeCron from "node-cron"

export const app = async () => {
  let token = ""
  let provider: MusicProvider = "Music"

  try {
    const credentials = getCredentials()
    console.log(Messages.read_success)
    token = credentials.token
    provider = credentials.provider
  } catch (err) {
    const answers = await getAnswers()
    token = answers.token
    provider = answers.options[0]
    const content = JSON.stringify({
      token,
      provider,
    })
    writeCredentials(content)
  }

  nodeCron.schedule("* * * * *", async () => await statusTask(provider))
}
