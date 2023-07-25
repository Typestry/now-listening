import inquirer from "inquirer"
import axios from "axios"
import path from "path"
import { fileURLToPath } from "url"
import { readFileSync, writeFile } from "fs"
import nodeCron from "node-cron"
import applescript from "applescript"
import NodeCache from "node-cache"

const Messages = {
  write_success: "Successfully wrote config file! Starting task! 🎉",
  read_success: "Successfully read config file! Starting task! 🎉",
  missing_token: "Please provide a token",
  invalid_token: "Please provide a valid slack token",
  no_option_selected: "Choose one of the above, use space to choose an option",
  too_many_options: "Please select only one option",
  token_question: "What is your slack app token?",
  provider_question: "Who is your music provider?",
}

const BASE_URL = "https://slack.com/api"
const UserRoutes = {
  writeProfile: () => `${BASE_URL}/users.profile.set`,
}
const TestRoutes = {
  auth: () => `${BASE_URL}/auth.test`,
}

const verifyAuth = async (token) => {
  const options = {
    method: "POST",
    url: TestRoutes.auth(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data.ok
  } catch (err) {
    return false
  }
}

const MusicProviders = {
  music: "Music",
  spotify: "Spotify",
}

const questions = [
  {
    name: "token",
    message: Messages.token_question,
    type: "input",
    validate: async (token) => {
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
    validate: (options) => {
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
const getAnswers = () => {
  return inquirer.prompt(questions)
}

const filename = fileURLToPath(import.meta.url)
const SRC = path.dirname(filename).split("/constants")[0]
const FILE_NAME = "config.txt"
const FILE_PATH = `${SRC}/${FILE_NAME}`
const ENCODING = "utf8"

const getCredentials = () => {
  const response = readFileSync(FILE_PATH, ENCODING)
  return JSON.parse(response)
}

const getStatusMac = (provider) => {
  const script = `tell application "${provider}" to get player state & (get {name, artist} of current track)`
  return new Promise((resolve) => {
    applescript.execString(script, async (err, result) => {
      // In some cases a TypeError is thrown most often when the player isn't playing music
      // Thus we are currently ignoring TyperErrors
      if (err instanceof TypeError) {
        console.error(err)
      }
      const [state, song, artist] = result
      if (state === "paused") {
        return
      }
      const status_emoji = "🎶"
      const status_text = `${song} by ${artist}`
      const payload = { status_emoji, status_text }
      resolve(payload)
    })
  })
}

const cache = new NodeCache()

const CacheKeys = {
  status: () => "status",
}

const client = axios.create({})
client.interceptors.request.use((config) => {
  const { token } = getCredentials()
  config.headers = {
    Authorization: `Bearer ${token}`,
  }
  return config
})

const updateStatus = async ({ status_emoji, status_text }) => {
  const prevStatus = cache.get(CacheKeys.status())
  if (prevStatus === status_text) {
    return
  }
  await client
    .post(UserRoutes.writeProfile(), { profile: { status_emoji, status_text } })
    .then(() => {
      cache.set(CacheKeys.status(), status_text)
      console.log(
        `Successfully updated status with: ${status_emoji} ${status_text}`,
      )
    })
    .catch(function (error) {
      console.error(error)
    })
}

const statusTask = (provider) => {
  const task = async () => {
    switch (process.platform) {
      case "darwin":
        await getStatusMac(provider).then(updateStatus)
      case "linux":
        throw Error("Linux is not currently supported.")
      case "win32":
        console.error("Windows is not currently supported.")
      default:
        throw Error(`Operating system is not supported.`)
    }
  }
  nodeCron.schedule("* * * * *", task)
}

const writeCredentials = (content) => {
  writeFile(FILE_PATH, content, (err) => {
    if (err) {
      console.error(err)
    }
    console.log(Messages.write_success)
  })
}

const app = async () => {
  let token = ""
  let provider = "Music"
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
  statusTask(provider)
}

export { app }
