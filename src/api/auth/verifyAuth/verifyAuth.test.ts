import axios from "axios"
import { describe, it, expect, vi } from "vitest"
import { verifyAuth } from "./verifyAuth"

describe("verifyAuth", () => {
  it("returns true if token is valid", async () => {
    // Arrange
    const token = "test_token"

    // Act
    const result = await verifyAuth(token)

    // Assert
    expect(result).toBe(true)
  })

  it("returns false if token is invalid", async () => {
    // Arrange
    const token = "invalid_token"

    // Act
    const result = await verifyAuth(token)

    // Assert
    expect(result).toBe(false)
  })

  it("returns false when an error is thrown", async () => {
    // Arrange
    vi.spyOn(axios, "post").mockImplementation(() =>
      Promise.reject("An error has occured."),
    )
    const token = "test_token"

    // Act
    const result = await verifyAuth(token)

    // Assert
    expect(result).toBe(false)
  })
})
