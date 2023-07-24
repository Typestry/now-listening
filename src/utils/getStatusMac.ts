import applescript from "applescript"
import { StatusGetter } from "../types/StatusGetter.js"

export const getStatusMac: StatusGetter = (provider) => {
  const script = `tell application "${provider}" to get player state & (get {name, artist} of current track)`

  return new Promise((resolve, reject) => {
    applescript.execString(script, async (err, result) => {
      if (err) {
        reject(err)
      }

      const [state, song, artist] = result as Array<string>

      if (state === "paused") {
        reject(
          `No result, make sure ${provider} is open and that a track is currently playing`,
        )
      }

      const status_emoji = "🎶"
      const status_text = `${song} by ${artist}`
      const payload = { status_emoji, status_text }

      resolve(payload)
    })
  })
}
