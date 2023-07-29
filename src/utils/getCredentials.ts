import { readFileSync } from "fs"
import { ENCODING, FILE_PATH } from "../constants/filesystem"
import { Credentials } from "../types/Credentials"

export const getCredentials = () => {
  const response = readFileSync(FILE_PATH, ENCODING)
  return JSON.parse(response) as Credentials
}
