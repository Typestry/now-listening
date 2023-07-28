import { server } from "./src/api/mocks/server"
import { vi } from "vitest"

vi.mock("./src/utils/getCredentials", () => ({
  getCredentials: () => {
    return { token: "test_token" }
  },
}))

vi.mock("./src/utils/getDirectory", () => ({
  getDirectory: () => {
    return { directory: "" }
  },
}))

server.listen()
