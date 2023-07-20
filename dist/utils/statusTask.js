var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import applescript from "applescript";
import axios from "axios";
import nodeCron from "node-cron";
import { UserRoutes } from "../constants/api.js";
export const statusTask = ({ token, provider }) => {
    const options = {
        method: "POST",
        url: UserRoutes.writeProfile(),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const script = `tell application "${provider}" to get player state & (get {name, artist} of current track)`;
    const task = () => {
        applescript.execString(script, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err || !Array.isArray(result)) {
                return;
            }
            const [state, song, artist] = result;
            if (state !== "paused") {
                const status_emoji = "🎶";
                const status_text = `${song} by ${artist}`;
                const data = { profile: { status_emoji, status_text } };
                yield axios
                    .request(Object.assign(Object.assign({}, options), { data }))
                    .then(function () {
                    console.log(`Successfully updated status with: ${status_emoji} ${status_text}`);
                })
                    .catch(function (error) {
                    console.error(error);
                });
            }
        }));
    };
    nodeCron.schedule("* * * * *", task);
};
//# sourceMappingURL=statusTask.js.map