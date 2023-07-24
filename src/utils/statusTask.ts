import nodeCron from "node-cron"
import { getStatusMac } from "./getStatusMac.js"
import { getCurrentOS } from "./getCurrentOS.js"
import { updateStatus } from "../api/status/updateStatus.js"
import { MusicProvider } from "../types/MusicProvider.js"
import { getStatusWindows } from "./getStatusWindows.js"

export const statusTask = (provider: MusicProvider) => {
  const currentOS = getCurrentOS()

  const task = async () => {
    switch (currentOS) {
      case "mac_os":
        await getStatusMac(provider).then(updateStatus)
      case "linux":
        return
      case "windows":
        await getStatusWindows(provider).then(updateStatus)
    }
  }
  nodeCron.schedule("* * * * *", task)
}
