import fs from "fs"
import { describe, it, vi, expect, afterEach } from "vitest"
import { parseArgs } from "./parseArgs"

vi.spyOn(fs, "writeFileSync")

describe("parseArgs", () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  it("writes an empty string to 'config.txt' when the config command is ran", async () => {
    // Arrange

    // Act
    await parseArgs().parse("config")

    // Assert
    expect(fs.writeFileSync).toHaveBeenCalledWith("./dist/config.txt", "")
  })

  it("does not write an empty string to 'config.txt' when no command is supplied", async () => {
    // Arrange

    // Act
    await parseArgs().parse("")

    // Assert
    expect(fs.writeFileSync).not.toHaveBeenCalled()
  })
})
