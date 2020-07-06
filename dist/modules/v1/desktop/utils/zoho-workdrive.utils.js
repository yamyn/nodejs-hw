"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZohoWorkdriveUtils = void 0;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
class ZohoWorkdriveUtils {
    constructor() {
        this.teamFolder = 'EmpMonitor';
    }
    async initConnection(storage) {
        const { refresh_token, domain, client_id, client_secret } = storage;
        this.domain = domain;
        this.clientId = client_id;
        this.clientSecret = client_secret;
        await this.getAccessToken(refresh_token);
    }
    async prepareFolderPath(email) {
        this.email = email;
    }
    async uploadFile(file) {
        const day = file.originalname.substr(3, 10);
        const zUserId = await this.getZUserId();
        const wSpaceOpt = await this.getWorkspacesOpt(zUserId);
        const mainFolderOpt = await this.getParentFoldersOpt(wSpaceOpt);
        const dayFolderOpt = await this.getFoldersOpt(mainFolderOpt, this.email);
        const dayFolderId = await this.getFoldersOpt(dayFolderOpt, day);
        await this.uploadScreenshotToDrive(file, dayFolderId);
    }
    async getAccessToken(refreshToken) {
        const fetchParams = {
            method: 'post',
            url: `https://accounts.zoho.${this.domain}/oauth/v2/token?refresh_token=${refreshToken}&client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=refresh_token`,
        };
        const { data } = await axios_1.default(fetchParams);
        this.headers = { Authorization: `Bearer ${data.access_token}` };
    }
    async getZUserId() {
        const fetchParams = {
            method: 'get',
            url: `https://projectsapi.zoho.${this.domain}/restapi/portals/`,
            headers: this.headers,
        };
        const { data } = await axios_1.default(fetchParams);
        return data.login_id;
    }
    async getWorkspacesOpt(zUserId) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${this.domain}/api/v1/users/${zUserId}/teams`,
            headers: this.headers,
        };
        const { data } = await axios_1.default(fetchParams);
        return {
            id: data.data[0].id,
            url: data.data[0].relationships.workspaces.links.related,
        };
    }
    async getParentFoldersOpt({ id, url, }) {
        const fetchParams = {
            method: 'get',
            url,
            headers: this.headers,
        };
        const { data } = await axios_1.default(fetchParams);
        let empMonitor = data.data.find(wspace => wspace.attributes.name === this.teamFolder);
        if (!empMonitor)
            empMonitor = await this.createTeamFolder(id);
        return {
            id: empMonitor.id,
            url: empMonitor.relationships.folders.links.related,
        };
    }
    async createTeamFolder(teamID) {
        const body = {
            data: {
                attributes: {
                    name: this.teamFolder,
                    parent_id: teamID,
                    is_public_within_team: true,
                    description: 'EmpMonitor service screenshots main folder',
                },
                type: 'workspaces',
            },
        };
        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${this.domain}/api/v1/workspaces`,
            headers: this.headers,
            data: JSON.stringify(body),
        };
        const { data } = await axios_1.default(fetchParams);
        return data.data;
    }
    async getFoldersOpt({ id, url }, folderName) {
        const isEmailFolder = folderName === this.email;
        let folder;
        const fetchParams = {
            method: 'get',
            url,
            headers: this.headers,
        };
        const { data } = await axios_1.default(fetchParams);
        if (data.data.length !== 0) {
            folder = data.data.find(folder => folder.attributes.name === folderName);
        }
        if (data.data.length === 0 || !folder) {
            folder = await this.createFolder(id, folderName);
        }
        if (!isEmailFolder) {
            return folder.id;
        }
        return { id: folder.id, url: folder.relationships.folders.links.related };
    }
    async createFolder(parentFoldId, folderName) {
        const body = {
            data: {
                attributes: {
                    name: folderName,
                    parent_id: parentFoldId,
                },
                type: 'files',
            },
        };
        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${this.domain}/api/v1/files`,
            headers: this.headers,
            data: JSON.stringify(body),
        };
        const { data } = await axios_1.default(fetchParams);
        return data.data;
    }
    async uploadScreenshotToDrive(file, folderId) {
        const data = new form_data_1.default();
        data.append('content', fs_1.default.createReadStream(file.filepath));
        const headers = Object.assign(Object.assign({}, this.headers), data.getHeaders());
        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${this.domain}/api/v1/upload?filename=${file.originalname}&parent_id=${folderId}&override-name-exist=true`,
            headers,
            data,
        };
        await axios_1.default(fetchParams);
    }
}
exports.ZohoWorkdriveUtils = ZohoWorkdriveUtils;
//# sourceMappingURL=zoho-workdrive.utils.js.map