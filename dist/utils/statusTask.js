var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodeCron from "node-cron";
import { getStatusMac } from "./getStatusMac.js";
import { updateStatus } from "../api/status/updateStatus.js";
export const statusTask = (provider) => {
    const task = () => __awaiter(void 0, void 0, void 0, function* () {
        switch (process.platform) {
            case "darwin":
                yield getStatusMac(provider).then(updateStatus);
            case "linux":
                throw Error("Linux is not currently supported.");
            case "win32":
                console.error("Windows is not currently supported.");
            default:
                throw Error(`Operating system is not supported.`);
        }
    });
    nodeCron.schedule("* * * * *", task);
};
//# sourceMappingURL=statusTask.js.map