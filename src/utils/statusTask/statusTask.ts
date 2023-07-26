import { getStatusMac } from "../getStatusMac"
import { updateStatus } from "../../api/status/updateStatus"
import { MusicProvider } from "../../types/MusicProvider"

export const statusTask = async (provider: MusicProvider) => {
  switch (process.platform) {
    case "darwin":
      const payload = await getStatusMac(provider)
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
