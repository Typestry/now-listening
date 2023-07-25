import nodeCron from "node-cron"
import { getStatusMac } from "./getStatusMac"
import { updateStatus } from "../api/status/updateStatus"
import { MusicProvider } from "../types/MusicProvider"

export const statusTask = (provider: MusicProvider) => {
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
