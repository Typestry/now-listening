import { ENCODING, FILE_PATH } from "../constants/filesystem.js"
import { Messages } from "../constants/messages.js"
import { Credentials } from "../types/Credentials.js"
import { readFileSync } from "fs"

export const getCredentials = () => {
  const response = readFileSync(FILE_PATH, ENCODING)
  console.log(Messages.read_success)
  return JSON.parse(response) as Credentials
}
