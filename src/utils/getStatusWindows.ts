import { PowerShell } from "node-powershell"
import { StatusGetter } from "../types/StatusGetter.js"

export const getStatusWindows: StatusGetter = async (provider) => {
  const getTitle = PowerShell.command`
    $processes = Get-Process ${provider.toLowerCase()}
    $title = (Out-String -InputObject $processes.mainWindowTitle) -replace "\`n","" -replace "\`r",""
    $song = $null
    if (-Not $title.Contains('${provider}')) {
        $song = $title
    }
    Write-Output $song
  `

  await PowerShell.invoke(getTitle).then((result) => {
    console.log(result)
  })

  return { status_emoji: "", status_text: "" }
}
