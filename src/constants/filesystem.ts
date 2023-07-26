import { getDirectory } from "../utils/getDirectory"

const { directory } = getDirectory()

console.log(directory)

const SRC = directory.split("/constants")[0]

export const FILE_NAME = "config.txt"
export const FILE_PATH = `${SRC}/${FILE_NAME}`
export const ENCODING = "utf8"
