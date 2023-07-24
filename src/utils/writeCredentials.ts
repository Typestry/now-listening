import { writeFile } from "fs"
import { FILE_PATH } from "../constants/filesystem.js"
import { Messages } from "../constants/messages.js"

export const writeCredentials = (content: string) => {
  writeFile(FILE_PATH, content, (err) => {
    if (err) {
      console.error(err)
    }
    console.log(Messages.write_success)
  })
}
