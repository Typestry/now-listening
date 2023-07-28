// adapted from https://stackoverflow.com/questions/65442325/how-to-notify-npm-package-version-update-to-user
import semver from "semver"
import semverDiff from "semver-diff"

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

const capitalize = (text: string) => {
  const firstChar = text.charAt(0)
  const capitalized = firstChar.toUpperCase() + text.split(firstChar)[1]
  return capitalized
}
