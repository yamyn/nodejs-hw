"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FtpUtils = void 0;
const ftp = __importStar(require("basic-ftp"));
const fs_1 = require("fs");
class FtpUtils {
    async initConnection(storage) {
        const { username, password, host, port, certificate } = storage;
        this.client = new ftp.Client();
        const baseOptions = {
            host, port, user: username, password: password
        };
        if (certificate) {
            await this.client.access(Object.assign(Object.assign({}, baseOptions), { secure: true, secureOptions: {
                    cert: certificate
                } }));
        }
        else {
            let notConnected = false;
            await this.client.access(Object.assign(Object.assign({}, baseOptions), { secure: false }))
                .catch(() => { notConnected = true; });
            if (notConnected) {
                await this.client.access(Object.assign(Object.assign({}, baseOptions), { secure: true }));
            }
        }
    }
    ;
    async prepareFolderPath(email) {
        this.email = email;
    }
    ;
    async uploadFile(file) {
        const day = file.originalname.substr(3, 10);
        const folder = `/EmpMonitor/${this.email}/${day}`;
        const fileStream = fs_1.createReadStream(file.filepath);
        await this.client.ensureDir(folder);
        await this.client.uploadFrom(fileStream, file.originalname);
    }
    ;
}
exports.FtpUtils = FtpUtils;
//# sourceMappingURL=ftp.utils.js.map