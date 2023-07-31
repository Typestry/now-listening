// adapted from https://stackoverflow.com/questions/65442325/how-to-notify-npm-package-version-update-to-user
import semver from "semver"
import semverDiff from "semver-diff"
import { AbbreviatedMetadata } from "package-json"
import { capitalize } from "../capitalize"
import { PackageJson } from "../../types/PackageJson"

export const checkForUpdate = async (
  latestPackage: AbbreviatedMetadata,
  localPackage: PackageJson,
) => {
  const localVersion = localPackage.version
  const latestVersion = latestPackage.version as string
  const isOutdated = semver.lt(localVersion, latestVersion)

  if (isOutdated) {
    let updateType = ""
    const verDiff = semverDiff(localVersion, latestVersion)

    if (verDiff) {
      updateType = capitalize(verDiff)
    }

    return { updateType, localVersion, latestVersion }
  }
}
