import { server } from "./src/api/mocks/server"

jest.mock("./src/utils/getCredentials", () => ({
  getCredentials: () => {
    return { token: "test_token" }
  },
}))

jest.mock("./src/utils/getDirectory", () => ({
  getDirectory: () => {
    return { directory: "" }
  },
}))

server.listen()
