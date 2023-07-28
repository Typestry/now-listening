import { describe, expect, it } from "vitest"
import { capitalize } from "./capitalize"

describe("capitalize", () => {
  it("capitalizes the first letter of string", () => {
    // Arrange
    const text = "hello"

    // Act
    const result = capitalize(text)

    // Assert
    expect(result).toBe("Hello")
  })
})
