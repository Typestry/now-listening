import { readFileSync } from "fs"
import { ENCODING, FILE_PATH } from "../constants/filesystem"
import { ConfigParams } from "../types/ConfigParams"

export const getConfig = () => {
  const response = readFileSync(FILE_PATH, ENCODING)
  return JSON.parse(response) as ConfigParams
}
