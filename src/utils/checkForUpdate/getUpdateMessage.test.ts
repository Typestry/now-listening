import { describe, it, expect } from "vitest"
import stripAnsi from "strip-ansi"
import { MetaData, getUpdateMessage } from "./getUpdateMessage"

describe("getUpdateMessage", () => {
  it("parses metaData into formatted message", () => {
    // Arrange
    const metaData: MetaData = {
      latestVersion: "3.0.0",
      localVersion: "2.0.0",
      name: "now-listening",
      updateType: "Major",
    }

    // Act
    const message = getUpdateMessage(metaData)
    const expectedMessage =
      "Major update available 2.0.0 → 3.0.0\nRun npm i -g now-listening to update"

    // Assert
    expect(stripAnsi(message)).toEqual(expectedMessage)
  })
})
