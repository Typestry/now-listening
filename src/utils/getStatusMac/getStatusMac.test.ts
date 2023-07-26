import { getStatusMac } from "./getStatusMac"
import applescript from "applescript"

const applescriptMock = jest.spyOn(applescript, "execString")

jest.spyOn(console, "error")

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

  it("logs an error if error type is not TypeError", async () => {
    // Arrange
    const errorMessage = "Something went wrong!"
    applescriptMock.mockImplementation((_script, args) =>
      args(errorMessage, ["playing", "hello", "world"]),
    )

    // Act
    await getStatusMac("Music")

    // Assert
    expect(console.error).toHaveBeenCalledWith(errorMessage)
  })

  it("returns null if error is TypeError", async () => {
    // Arrange
    applescriptMock.mockImplementation((_script, args) =>
      args(new TypeError("result is not iterable"), []),
    )

    // Act
    const result = await getStatusMac("Music")

    // Assert
    expect(result).toBeNull()
  })
})
