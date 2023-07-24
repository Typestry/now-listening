import { MusicProvider } from "./types/MusicProvider.js"
import { getAnswers } from "./utils/getAnswers.js"
import { getCredentials } from "./utils/getCredentials.js"
import { statusTask } from "./utils/statusTask.js"
import { writeCredentials } from "./utils/writeCredentials.js"

export const app = async () => {
  let token = ""
  let provider: MusicProvider = "Music"

  try {
    const credentials = getCredentials()
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

  statusTask(provider)
}
