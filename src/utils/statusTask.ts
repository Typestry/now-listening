import nodeCron from "node-cron"
import { getStatusMac } from "./getStatusMac.js"
import { updateStatus } from "../api/status/updateStatus.js"
import { MusicProvider } from "../types/MusicProvider.js"
import { getStatusWindows } from "./getStatusWindows.js"

export const statusTask = (provider: MusicProvider) => {
  const task = async () => {
    switch (process.platform) {
      case "darwin":
        await getStatusMac(provider).then(updateStatus)
      case "linux":
        throw Error("Linux is not currently supported.")
      case "win32":
        await getStatusWindows(provider).then(updateStatus)
      default:
        throw Error(`Operating system is not supported.`)
    }
  }
  nodeCron.schedule("* * * * *", task)
}
