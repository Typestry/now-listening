import { ENCODING, FILE_PATH } from "../constants/filesystem.js";
import { readFileSync } from "fs";
export const getCredentials = () => {
    const response = readFileSync(FILE_PATH, ENCODING);
    return JSON.parse(response);
};
//# sourceMappingURL=getCredentials.js.map