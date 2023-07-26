import applescript from "applescript"
import { StatusGetter } from "../../types/StatusGetter"

export const getStatusMac: StatusGetter = (provider) => {
  const script = `tell application "${provider}" to get player state & (get {name, artist} of current track)`

  return new Promise((resolve) => {
    applescript.execString(script, async (err, result) => {
      // In some cases a TypeError is thrown most often when the player isn't playing music
      // Thus we are currently ignoring TyperErrors
      if (err! instanceof TypeError) {
        console.error(err)
      }

      const [state, song, artist] = result

      if (state === "paused") {
        resolve(null)
      }

      const status_emoji = "🎶"
      const status_text = `${song} by ${artist}`
      const payload = { status_emoji, status_text }

      resolve(payload)
    })
  })
}
