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
})
