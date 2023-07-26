import { server } from "./src/api/mocks/server"

jest.mock("./src/utils/getDirectory", () => ({
  getDirectory: () => {
    return { directory: "" }
  },
}))

server.listen()
