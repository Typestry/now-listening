import { getStatusMac } from "../getStatusMac"
import { statusTask } from "./statusTask"

jest.mock("../getStatusMac")
jest.mock("../../api/status/updateStatus")
jest.spyOn(console, "error")

describe("statusTask", () => {
  it("invokes a task method with provider 'Music' when ran on a supported platform", async () => {
    // Arrange
    const provider = "Music"

    Object.defineProperty(process, "platform", {
      value: "darwin",
    })

    // Act
    await statusTask(provider)

    // Assert
    expect(getStatusMac).toHaveBeenCalledWith(provider)
  })

  it("invokes a task method with provider 'Spotify' when ran on a supported platform", async () => {
    // Arrange
    const provider = "Spotify"

    Object.defineProperty(process, "platform", {
      value: "darwin",
    })

    // Act
    await statusTask(provider)

    // Assert
    expect(getStatusMac).toHaveBeenCalledWith(provider)
  })

  it("prints an error when ran on linux", async () => {
    // Arrange
    Object.defineProperty(process, "platform", {
      value: "linux",
    })

    // Act
    await statusTask("Music")

    // Assert
    expect(console.error).toHaveBeenCalledWith(
      "Linux is not currently supported.",
    )
  })

  it("prints an error when ran on windows", async () => {
    // Arrange
    Object.defineProperty(process, "platform", {
      value: "win32",
    })

    // Act
    await statusTask("Music")

    // Assert
    expect(console.error).toHaveBeenCalledWith(
      "Windows is not currently supported.",
    )
  })

  it("print a generic error for all other platforms", async () => {
    // Arrange
    Object.defineProperty(process, "platform", {
      value: "freebsd",
    })

    // Act
    await statusTask("Music")

    // Assert
    expect(console.error).toHaveBeenCalledWith(
      "Operating system is not supported.",
    )
  })
})
