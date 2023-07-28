// adapted from https://stackoverflow.com/questions/65442325/how-to-notify-npm-package-version-update-to-user
import semver from "semver"
import semverDiff from "semver-diff"
import { capitalize } from "../capitalize"

export const checkForUpdate = async (
  latestPackage: Record<string, any>,
  localPackage: Record<string, any>,
) => {
  const localVersion = localPackage.version
  const latestVersion = latestPackage.version
  const isOutdated = semver.lt(localVersion, latestVersion)

  if (isOutdated) {
    let updateType = ""
    let verDiff = semverDiff(localVersion, latestVersion)

    if (verDiff) {
      updateType = capitalize(verDiff)
    }

    return { updateType, localVersion, latestVersion }
  }
}
