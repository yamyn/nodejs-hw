"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDriveUtils = void 0;
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
class GoogleDriveUtils {
    async initConnection(storage) {
        const { client_id, client_secret, refresh_token } = storage;
        const oauth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, '');
        oauth2Client.setCredentials({ access_token: '', refresh_token: refresh_token });
        googleapis_1.google.options({ auth: oauth2Client });
        this.drive = googleapis_1.google.drive({ version: 'v3', auth: oauth2Client });
    }
    async prepareFolderPath(email) {
        let mainFolderId = null;
        const mainFolderData = await this.getFolderByName('EmpMonitor');
        if (mainFolderData.files.length === 0) {
            const newMainFolderData = await this.createNewFolder('EmpMonitor');
            mainFolderId = newMainFolderData.data.id;
            const permission = await this.addSharePermissionToFolder(mainFolderId);
        }
        else {
            mainFolderId = mainFolderData.files[0].id;
        }
        const mailFolderData = await this.getFolderByParentId(mainFolderId, email);
        if (mailFolderData.files.length === 0) {
            const newMailFolderData = await this.createNewFolderWithParent(email, mainFolderId);
            this.mailFolderId = newMailFolderData.data.id;
        }
        else {
            this.mailFolderId = mailFolderData.files[0].id;
        }
    }
    async uploadFile(file) {
        let dayFolderId = null;
        const day = file.originalname.substr(3, 10);
        const dayFolderData = await this.getFolderByParentId(this.mailFolderId, day);
        if (dayFolderData.files.length === 0) {
            const newDateFolderData = await this.createNewFolderWithParent(day, this.mailFolderId);
            dayFolderId = newDateFolderData.data.id;
        }
        else {
            dayFolderId = dayFolderData.files[0].id;
        }
        const uploads = await this.uploadScreenshotToDrive(dayFolderId, file.filepath, file.originalname);
    }
    async getFolderByName(name) {
        const res = await this.drive.files.list({ pageSize: 1000, q: `name='${name}'`, pageToken: '', fields: 'nextPageToken, files(*)', });
        return res.data;
    }
    async createNewFolder(name) {
        const fileMetadata = {
            'name': name,
            'mimeType': 'application/vnd.google-apps.folder'
        };
        const res = await this.drive.files.create({ requestBody: fileMetadata }, {});
        return res;
    }
    async getFolderByParentId(parentId, name) {
        const res = await this.drive.files.list({
            pageSize: 1000,
            q: `name='${name}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed = false`,
            pageToken: '',
            fields: 'nextPageToken, files(*)'
        });
        return res.data;
    }
    async createNewFolderWithParent(name, parentId) {
        const fileMetadata = {
            'name': name,
            'mimeType': 'application/vnd.google-apps.folder',
            parents: [parentId]
        };
        const res = await this.drive.files.create({ requestBody: fileMetadata, fields: 'id' });
        return res;
    }
    async addSharePermissionToFolder(folderId) {
        const fileMetadata = { 'role': "reader", 'type': "anyone" };
        const permision = await this.drive.permissions.create({ fileId: folderId, requestBody: fileMetadata });
        return permision;
    }
    async uploadScreenshotToDrive(folderId, path, filename) {
        const fileMetadata = {
            'name': filename,
            parents: [folderId]
        };
        const media = {
            mimeType: 'image/jpeg',
            body: fs_1.default.createReadStream(path)
        };
        const res = await this.drive.files.create({ requestBody: fileMetadata, media: media });
        return res;
    }
}
exports.GoogleDriveUtils = GoogleDriveUtils;
//# sourceMappingURL=google-drive.utils.js.map