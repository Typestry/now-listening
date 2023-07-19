var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { TestRoutes } from "../constants/api.js";
export const verifyAuth = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: "POST",
        url: TestRoutes.auth(),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = yield axios.request(options);
        return response.data.ok;
    }
    catch (err) {
        return false;
    }
});
//# sourceMappingURL=verifyAuth.js.map