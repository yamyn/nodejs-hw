"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnedriveUtils = void 0;
const onedrive_api_1 = __importDefault(require("onedrive-api"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const query_string_1 = __importDefault(require("query-string"));
class OnedriveUtils {
    constructor() {
        this.teamFolder = 'EmpMonitor';
    }
    async initConnection(storage) {
        const { refresh_token, client_id, client_secret, redirect_uri } = storage;
        this.clientId = client_id;
        this.clientSecret = client_secret;
        this.redirectUrl = redirect_uri;
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
        const body = {
            client_id: this.clientId,
            redirect_uri: this.redirectUrl,
            client_secret: this.clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        };
        const fetchParams = {
            method: 'post',
            url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: query_string_1.default.stringify(body),
        };
        const { data } = await axios_1.default(fetchParams);
        this.accessToken = data.access_token;
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
//# sourceMappingURL=one-drive.utils.js.map