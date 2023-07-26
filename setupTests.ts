jest.mock("./src/utils/getDirectory", () => ({
  getDirectory: () => {
    return { directory: "" }
  },
}))
