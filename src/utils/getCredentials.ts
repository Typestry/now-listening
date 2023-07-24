import { ENCODING, FILE_PATH } from "../constants/filesystem.js"
import { Credentials } from "../types/Credentials.js"
import { readFileSync } from "fs"

export const getCredentials = () => {
  const response = readFileSync(FILE_PATH, ENCODING)
  return JSON.parse(response) as Credentials
}
