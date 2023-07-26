import { ProfilePartial } from "../../../types/ProfilePartial"
import { client } from "../../client"
import { updateStatus } from "./updateStatus"
import { cache } from "../../../cache"
import { CacheKeys } from "../../../constants/cache"

jest.spyOn(client, "post")

describe("updateStatus", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("invokes client.post if there is a valid payload", async () => {
    // Arrange
    const payload: ProfilePartial = {
      status_emoji: "",
      status_text: "hello by world",
    }

    // Act
    await updateStatus(payload)

    // Assert
    expect(client.post).toHaveBeenCalled()
  })

  it("does not invoke client.post if payload received is null", async () => {
    // Arrange
    const payload = null

    // Act
    await updateStatus(payload)

    // Assert
    expect(client.post).not.toHaveBeenCalled()
  })

  it("does not invoke client.post if current status equals previous status", async () => {
    // Arrange
    const payload: ProfilePartial = {
      status_emoji: "",
      status_text: "hello by world",
    }
    cache.set(CacheKeys.status(), payload.status_text)

    // Act
    await updateStatus(payload)

    // Assert
    expect(client.post).not.toHaveBeenCalled()
  })
})
