import applescript from "applescript"
import { StatusGetter } from "../../types/StatusGetter"
import { Emojis } from "../../constants/emojis"

export const getStatusMac: StatusGetter = (
  provider,
  emoji = Emojis["Musical Notes"],
) => {
  const script = `tell application "${provider}" to get player state & (get {name, artist} of current track)`

  return new Promise((resolve) => {
    applescript.execString(script, async (err, result) => {
      try {
        if (err) {
          throw err
        }

        if (result) {
          const [state, song, artist] = result

          if (state === "paused") {
            resolve(null)
          }

          const status_emoji = emoji
          const status_text = `${song} by ${artist}`
          const payload = { status_emoji, status_text }

          resolve(payload)
        } else {
          throw TypeError("Result not iterable.")
        }
      } catch (err) {
        resolve(null)
      }
    })
  })
}
