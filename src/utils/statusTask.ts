import applescript from "applescript"

import axios from "axios"
import nodeCron from "node-cron"
import { config } from "dotenv"
import { UserRoutes } from "../constants/api"
import { Payload } from "../types/Payload"

config()

export const statusTask = ({ token, provider }: Payload) => {
  const options = {
    method: "POST",
    url: UserRoutes.writeProfile(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const script = `tell application "${provider}" to get player state & (get {name, artist} of current track)`
  const task = () => {
    applescript.execString(script, async (err, result) => {
      if (err || !Array.isArray(result)) {
        return
      }

      const [state, song, artist] = result

      if (state !== "paused") {
        const status_emoji = "🎶"
        const status_text = `${song} by ${artist}`
        const data = { profile: { status_emoji, status_text } }

        await axios
          .request({ ...options, data })
          .then(function () {
            console.log(
              `Successfully updated status with: ${status_emoji} ${status_text}`,
            )
          })
          .catch(function (error) {
            console.error(error)
          })
      }
    })
  }
  nodeCron.schedule("* * * * *", task)
}
