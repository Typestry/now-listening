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
import { verifyAuth } from "../api/auth/verifyAuth.js";
import { Messages } from "../constants/messages.js";
import { MusicProviders } from "../constants/musicProviders.js";
const questions = [
    {
        name: "token",
        message: Messages.token_question,
        type: "input",
        validate: (token) => __awaiter(void 0, void 0, void 0, function* () {
            const isValid = yield verifyAuth(token);
            if (!isValid) {
                return Messages.invalid_token;
            }
            if (!token.length) {
                return Messages.missing_token;
            }
            return true;
        }),
    },
    {
        name: "options",
        message: Messages.provider_question,
        type: "checkbox",
        choices: Object.values(MusicProviders),
        validate: (options) => {
            if (!options.length) {
                return Messages.no_option_selected;
            }
            if (options.length > 1) {
                return Messages.too_many_options;
            }
            return true;
        },
    },
];
export const getAnswers = () => {
    return inquirer.prompt(questions);
};
//# sourceMappingURL=getAnswers.js.map