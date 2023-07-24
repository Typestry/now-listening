var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cache } from "../../cache/index.js";
import { UserRoutes } from "../../constants/api.js";
import { CacheKeys } from "../../constants/cache.js";
import { client } from "../client.js";
export const updateStatus = ({ status_emoji, status_text, }) => __awaiter(void 0, void 0, void 0, function* () {
    const prevStatus = cache.get(CacheKeys.status());
    if (prevStatus === status_text) {
        return;
    }
    yield client
        .post(UserRoutes.writeProfile(), { profile: { status_emoji, status_text } })
        .then(() => {
        cache.set(CacheKeys.status(), status_text);
        console.log(`Successfully updated status with: ${status_emoji} ${status_text}`);
    })
        .catch(function (error) {
        console.error(error);
    });
});
//# sourceMappingURL=updateStatus.js.map