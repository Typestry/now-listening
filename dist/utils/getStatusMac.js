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
export const getStatusMac = (provider) => {
    const script = `tell application "${provider}" to get player state & (get {name, artist} of current track)`;
    return new Promise((resolve) => {
        applescript.execString(script, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            // In some cases a TypeError is thrown most often when the player isn't playing music
            // Thus we are currently ignoring TyperErrors
            if (err instanceof TypeError) {
                console.error(err);
            }
            const [state, song, artist] = result;
            if (state === "paused") {
                return;
            }
            const status_emoji = "🎶";
            const status_text = `${song} by ${artist}`;
            const payload = { status_emoji, status_text };
            resolve(payload);
        }));
    });
};
//# sourceMappingURL=getStatusMac.js.map