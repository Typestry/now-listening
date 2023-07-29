import { ENCODING, FILE_PATH } from "../constants/filesystem"
import { ConfigParams } from "../types/ConfigParams"
import { readFileSync } from "fs"

export const getConfig = () => {
  const response = readFileSync(FILE_PATH, ENCODING)
  return JSON.parse(response) as ConfigParams
}
