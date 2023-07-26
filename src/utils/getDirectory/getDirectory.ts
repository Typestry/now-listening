import { fileURLToPath } from "url"
import path from "path"

export const getDirectory = () => {
  const filename = fileURLToPath(import.meta.url)
  const directory = path.dirname(filename)
  return { directory }
}
