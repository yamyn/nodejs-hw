"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnedriveUtils = void 0;
const onedrive_api_1 = __importDefault(require("onedrive-api"));
const fs_1 = __importDefault(require("fs"));
class OnedriveUtils {
    constructor() {
        this.clientId = process.env.ONEDRIVE_CLIENT_ID;
        this.clientSecret = process.env.ONEDRIVE_CLIENT_SECRET;
        this.teamFolder = "EmpMonitor";
        this.redirectUrl = process.env.ONEDRIVE_REDIRECT_URI;
    }
    async initConnection(storage) {
        const { refresh_token } = storage;
        await this.getAccessToken(refresh_token);
    }
    async prepareFolderPath(email) {
        this.email = email;
    }
    async uploadFile(file) {
        const day = file.originalname.substr(3, 10);
        const mainFolderId = await this.getFolder(this.teamFolder, 'root');
        const userFolderId = await this.getFolder(this.email, mainFolderId);
        const dayFolderId = await this.getFolder(day, userFolderId);
        await this.uploadScreenshotToDrive(file, dayFolderId);
    }
    async getAccessToken(refreshToken) {
        this.accessToken = refreshToken;
    }
    async getFolder(folderName, parentId) {
        let folder;
        const accountData = await onedrive_api_1.default.items.listChildren({
            accessToken: this.accessToken,
            itemId: parentId,
        });
        if (accountData.value.length !== 0) {
            folder = accountData.value.find(file => file.name === folderName);
            if (folder)
                return folder.id;
        }
        folder = await this.createFolder(folderName, parentId);
        return folder.id;
    }
    async createFolder(folderName, parentId) {
        const newFolder = await onedrive_api_1.default.items.createFolder({
            accessToken: this.accessToken,
            rootItemId: parentId,
            name: folderName,
        });
        return newFolder;
    }
    async uploadScreenshotToDrive(file, parentId) {
        await onedrive_api_1.default.items.uploadSimple({
            accessToken: this.accessToken,
            filename: file.originalname,
            parentId,
            readableStream: fs_1.default.createReadStream(file.filepath),
        });
    }
}
exports.OnedriveUtils = OnedriveUtils;
//# sourceMappingURL=one-drive.utils copy.js.map