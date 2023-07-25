import { getStatusMac } from "../src/utils/getStatusMac"
import applescript from "applescript"

const applescriptMock = jest.spyOn(applescript, "execString")

describe("statusTask", () => {
  it("returns emoji and status text when state is 'playing'", async () => {
    // Arrange
    applescriptMock.mockImplementation((_script, args) =>
      args(null, ["playing", "hello", "world"]),
    )

    // Act
    const result = await getStatusMac("Music")

    // Assert
    expect(result).toStrictEqual({
      status_emoji: "🎶",
      status_text: "hello by world",
    })
  })

  it("returns null when status is 'paused'", async () => {
    // Arrange
    applescriptMock.mockImplementation((_script, args) =>
      args(null, ["paused"]),
    )

    // Act
    const result = await getStatusMac("Music")

    // Assert
    expect(result).toBeNull()
  })

  it("passes 'Music' into script when provider is 'Music'", async () => {
    // Arrange
    const provider = "Music"
    const getScript = jest.fn()
    applescriptMock.mockImplementation((script, args) => {
      getScript(script)
      args(null, ["paused"])
    })

    // Act
    await getStatusMac(provider)

    // Assert
    expect(getScript).toHaveBeenCalledWith(
      `tell application "${provider}" to get player state & (get {name, artist} of current track)`,
    )
  })

  it("passes 'Spotify' into script when provider is 'Spotify'", async () => {
    // Arrange
    const provider = "Spotify"
    const getScript = jest.fn()
    applescriptMock.mockImplementation((script, args) => {
      getScript(script)
      args(null, ["paused"])
    })

    // Act
    await getStatusMac(provider)

    // Assert
    expect(getScript).toHaveBeenCalledWith(
      `tell application "${provider}" to get player state & (get {name, artist} of current track)`,
    )
  })
})