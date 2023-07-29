import { server } from "./src/api/mocks/server"
import { vi } from "vitest"

vi.mock("./src/utils/getConfig", () => ({
  getConfig: () => {
    return { token: "test_token" }
  },
}))

vi.mock("./src/utils/getDirectory", () => ({
  getDirectory: () => {
    return { directory: "" }
  },
}))

server.listen()
