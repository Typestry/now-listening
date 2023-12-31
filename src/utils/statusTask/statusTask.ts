import { getStatusMac } from "../getStatusMac"
import { updateStatus } from "../../api/status/updateStatus"
import { MusicProvider } from "../../types/MusicProvider"
import { Emoji } from "../../types/Emoji"

export const statusTask = async (
  provider: MusicProvider,
  emoji: Emoji = "🎶",
) => {
  let payload
  switch (process.platform) {
    case "darwin":
      payload = await getStatusMac(provider, emoji)
      await updateStatus(payload)
      break
    case "linux":
      console.error("Linux is not currently supported.")
      break
    case "win32":
      console.error("Windows is not currently supported.")
      break
    default:
      console.error(`Operating system is not supported.`)
  }
}
