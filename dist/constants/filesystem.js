import path from "path";
import { fileURLToPath } from "url";
const filename = fileURLToPath(import.meta.url);
const SRC = path.dirname(filename).split("/constants")[0];
export const FILE_NAME = "config.txt";
export const FILE_PATH = `${SRC}/${FILE_NAME}`;
export const ENCODING = "utf8";
//# sourceMappingURL=filesystem.js.map