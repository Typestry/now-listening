import { vi, describe, afterEach, it, expect } from "vitest"
import { ProfilePartial } from "../../../types/ProfilePartial"
import { cache } from "../../../cache"
import { CacheKeys } from "../../../constants/cache"
import { updateStatus } from "./updateStatus"

vi.spyOn(console, "log")
vi.spyOn(console, "error")

describe("updateStatus", () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it("invokes request if there is a valid payload", async () => {
    // Arrange
    const payload: ProfilePartial = {
      status_emoji: "🎶",
      status_text: "hello by world",
    }

    // Act
    await updateStatus(payload)
    const prevStatus = cache.get(CacheKeys.status())

    // Assert
    expect(prevStatus).toEqual(payload.status_text)
    expect(console.log).toHaveBeenCalledWith(
      "Successfully updated status with: 🎶 hello by world",
    )
  })

  it("does not invoke request if payload received is null", async () => {
    // Arrange
    const payload = null

    // Act
    const response = await updateStatus(payload)

    // Assert
    expect(response).not.toBeDefined()
  })

  it("does not invoke request if current status equals previous status", async () => {
    // Arrange
    const payload: ProfilePartial = {
      status_emoji: "🎶",
      status_text: "hello by world",
    }
    cache.set(CacheKeys.status(), payload.status_text)

    // Act
    const response = await updateStatus(payload)

    // Assert
    expect(response).not.toBeDefined()
  })

  it("throws an error if payload is invalid", async () => {
    // Arrange
    const payload: ProfilePartial = {
      status_emoji: "🎶",
      status_text: "",
    }

    // Act
    await updateStatus(payload)

    // Assert
    expect(console.error).toHaveBeenCalledWith(
      "Request failed with status code 500",
    )
  })
})
