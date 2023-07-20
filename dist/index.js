#!/usr/bin/env node --experimental-specifier-resolution=node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import { statusTask } from "./utils/statusTask.js";
import { readFileSync, writeFile } from "fs";
import { verifyAuth } from "./utils/verifyAuth.js";
import { Messages } from "./constants/messages.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_NAME = "config.txt";
const FILE_PATH = `${__dirname}/${FILE_NAME}`;
const ENCODING = "utf8";
(() => __awaiter(void 0, void 0, void 0, function* () {
    let token = "";
    let provider = "Music";
    try {
        const response = readFileSync(FILE_PATH, ENCODING);
        const config = JSON.parse(response);
        token = config.token;
        provider = config.provider;
        console.log(Messages.read_success);
    }
    catch (err) {
        const answers = yield getAnswers();
        token = answers.token;
        provider = answers.options[0];
        const content = JSON.stringify({
            token,
            provider,
        });
        writeFile(FILE_PATH, content, (err) => {
            if (err) {
                console.error(err);
            }
            console.log(Messages.write_success);
        });
    }
    statusTask({ token, provider });
}))();
function getAnswers() {
    return inquirer.prompt([
        {
            name: "token",
            message: "What is your slack app token?",
            type: "input",
            validate: (token) => __awaiter(this, void 0, void 0, function* () {
                const isValid = yield verifyAuth(token);
                if (!isValid) {
                    return "Please provide a valid slack token";
                }
                if (!token.length) {
                    return "Please provide a token";
                }
                return true;
            }),
        },
        {
            name: "options",
            message: "Who is your music provider?",
            type: "checkbox",
            choices: ["Music", "Spotify"],
            validate: (options) => {
                if (!options.length) {
                    return "Choose at least one of the above, use space to choose the option";
                }
                if (options.length > 1) {
                    return "Please select only one option";
                }
                return true;
            },
        },
    ]);
}
//# sourceMappingURL=index.js.map