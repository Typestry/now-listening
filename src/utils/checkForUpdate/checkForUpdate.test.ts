import { checkForUpdate } from "./checkForUpdate"
import { describe, it, expect, vi, afterEach } from "vitest"

describe("checkForUpdate", () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  it("returns metaData if local package is outdated", async () => {
    // Arrange
    const latest = {
      version: "3.0.0",
    }
    const local = {
      version: "2.0.0",
    }

    // Act
    const metaData = await checkForUpdate(latest, local)

    const localVersion = metaData?.localVersion
    const latestVersion = metaData?.latestVersion

    // Assert
    expect(localVersion).toBe(local.version)
    expect(latestVersion).toBe(latest.version)
  })

  it("does not return metaData if package is up to date", async () => {
    // Arrange
    const latest = {
      version: "2.0.0",
    }
    const local = {
      version: "2.0.0",
    }

    // Act
    const metaData = await checkForUpdate(latest, local)

    // Assert
    expect(metaData).not.toBeDefined()
  })
})
