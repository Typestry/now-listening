import { Config } from "jest"

const config = async (): Promise<Config> => ({
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {},
  moduleDirectories: ["node_modules"],
  rootDir: ".",
  extensionsToTreatAsEsm: [".ts"],
})

export default config
