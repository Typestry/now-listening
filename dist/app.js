var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Messages } from "./constants/messages.js";
import { getAnswers } from "./utils/getAnswers.js";
import { getCredentials } from "./utils/getCredentials.js";
import { statusTask } from "./utils/statusTask.js";
import { writeCredentials } from "./utils/writeCredentials.js";
export const app = () => __awaiter(void 0, void 0, void 0, function* () {
    let token = "";
    let provider = "Music";
    try {
        const credentials = getCredentials();
        console.log(Messages.read_success);
        token = credentials.token;
        provider = credentials.provider;
    }
    catch (err) {
        const answers = yield getAnswers();
        token = answers.token;
        provider = answers.options[0];
        const content = JSON.stringify({
            token,
            provider,
        });
        writeCredentials(content);
    }
    statusTask(provider);
});
//# sourceMappingURL=app.js.map