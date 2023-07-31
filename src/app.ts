import packageJson from "package-json"
import nodeCron from "node-cron"
import boxen from "boxen"
import figlet from "figlet"
import chalk from "chalk"
import localPackage from "../package.json"
import { Messages } from "./constants/messages"
import { MusicProvider } from "./types/MusicProvider"
import { getAnswers } from "./utils/getAnswers/getAnswers"
import { getConfig } from "./utils/getConfig"
import { statusTask } from "./utils/statusTask/statusTask"
import { writeCredentials } from "./utils/writeCredentials"
import { getUpdateMessage, checkForUpdate } from "./utils/checkForUpdate"
import { Branding } from "./constants/branding"
import { Emoji } from "./types/Emoji"

export const app = async () => {
  let token = ""
  let provider: MusicProvider = "Music"
  let emoji: Emoji = "🎶"
  const { name } = localPackage

  banner()

  try {
    const latestPackage = await packageJson(name)
    const metaData = await checkForUpdate(latestPackage, localPackage)

    if (metaData) {
      const message = getUpdateMessage({ ...metaData, name })

      console.log(
        boxen(message, {
          padding: 1,
          margin: {
            top: 1,
            bottom: 1,
          },
          borderStyle: "round",
        }),
      )
    }

    const config = getConfig()
    console.log(Messages.read_success)
    token = config.token
    provider = config.provider
    emoji = config.emoji
  } catch (err) {
    const answers = await getAnswers()
    token = answers.token
    provider = answers.provider
    emoji = answers.emoji
    const content = JSON.stringify({
      token,
      provider,
      emoji,
    })

    writeCredentials(content)
  }

  nodeCron.schedule("* * * * *", async () => await statusTask(provider, emoji))
}

const banner = () =>
  console.log(
    chalk.cyan(
      boxen(
        figlet.textSync(Branding.name, {
          font: "Slant",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        }) + `\n${Branding.tag_line}`,
        {
          margin: 1,
          borderStyle: "none",
        },
      ),
    ),
  )
