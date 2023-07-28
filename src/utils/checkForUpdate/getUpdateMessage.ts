import chalk from "chalk"

export interface MetaData {
  updateType: string
  localVersion: string
  latestVersion: string
  name: string
}

export const getUpdateMessage = ({
  updateType,
  localVersion,
  latestVersion,
  name,
}: MetaData) => {
  const msg = {
    updateAvailable: `${updateType} update available ${chalk.dim(
      localVersion,
    )} → ${chalk.green(latestVersion)}`,
    runUpdate: `Run ${chalk.cyan(`npm i -g ${name}`)} to update`,
  }
  return `${msg.updateAvailable}\n${msg.runUpdate}`
}
