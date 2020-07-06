"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenshotService = void 0;
const common_1 = require("@nestjs/common");
const response_helper_service_1 = require("../../../../common/helper/response.helper.service");
const integraion_model_1 = require("src/database/sequelize-db/models/integraion.model");
const file_utils_1 = require("../utils/file.utils");
const google_drive_utils_1 = require("../utils/google-drive.utils");
const s3_util_1 = require("../utils/s3.util");
const ftp_utils_1 = require("../utils/ftp.utils");
const zoho_workdrive_utils_1 = require("../utils/zoho-workdrive.utils");
const one_drive_utils_1 = require("../utils/one-drive.utils");
const testGDCredentials = {
    dbStorageData: { short_code: "GD" },
    storage: {
        client_id: "345498651740-c0m8ng9eu38el5vdbdrlbq7s0en8okml.apps.googleusercontent.com",
        client_secret: "sA11WSMyEG1GartsaUYW7ueB",
        refresh_token: "1//04RgoxfPRzOXXCgYIARAAGAQSNwF-L9IrTeqXxx6P5xflPP7M4epFIYmutx7WzdnTDMkJyHFUuMiRtFdlER7rB-kUgrkQbk8hDok"
    }
};
const testS3Credentials = {
    dbStorageData: { short_code: "S3" },
    storage: {
        client_id: "AKIAJ3EGPXHQF6M6VGLQ",
        client_secret: "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",
        bucket_name: "demobucket1324"
    }
};
const testFTPCredentials = {
    dbStorageData: { short_code: "FTP" },
    storage: {
        username: "user",
        password: "password",
        host: "localhost",
        port: 3021
    }
};
const testZWDCredentials = {
    dbStorageData: { short_code: "ZWD" },
    storage: {
        client_id: '1000.Y3PQVD1G6UNUH6K6X4MOH6FC84ATQR',
        client_secret: '0f6a0650a9e858b814e3a28e93b7c86026c5a8f63a',
        refresh_token: "1000.b3243251727c8de1f7841d026fad96a3.e46fedbf272ae0332200387a81413327",
        domain: "eu"
    }
};
const testODCredentials = {
    dbStorageData: { short_code: "OD" },
    storage: {
        client_id: '0230bde8-7a61-4748-9e84-6768ec34f22d',
        client_secret: '_0slmWU8nY5mJ~~FH5_0ySKA4ph_iDyXBg',
        refresh_token: 'MCQTPtRyqP*mIuzsz6R8sLoE4FKaZW1xy1uLH*AbtsJKLGDVr5MIo*YHNJvBmffar!iYDI691hK6b25Rp1Z*szx8R3RODbLzy6mXj2OiSf8Fn67HD8d7pkqWom4rRt*y5id6WhN8hqUihUjkfapAUdWk4ZO52U3TUtU!yIQlVpdlFeGmx9u2wQQiHy05AC1fUgP765jpRFanRER9dwNjg8IWBCMbivIMC43wMsJGmSYyG8Vuf7FcYeuuez9b7QIZFQKu6XfO!Z7FkF5tN1buZaNwcJMtK6*gTQ8FsYoB04CfIuIs37bJD19kQbhanm0sxDvvCQxnD9!FhvP8RwFnGgdLkXHJoMCEJsoOQ6cPeiJBWD8cL!o!3FUgB!1J6KOBbNRe1iwTppSYsxpd2vA5mcsY$',
        redirect_uri: 'https://github.com/yamyn'
    }
};
let ScreenshotService = class ScreenshotService {
    constructor(responseHelperService, integrationModel) {
        this.responseHelperService = responseHelperService;
        this.integrationModel = integrationModel;
        this.providers = new Map();
        this.providers.set('GD', google_drive_utils_1.GoogleDriveUtils);
        this.providers.set('S3', s3_util_1.S3Util);
        this.providers.set('FTP', ftp_utils_1.FtpUtils);
        this.providers.set('ZWD', zoho_workdrive_utils_1.ZohoWorkdriveUtils);
        this.providers.set('OD', one_drive_utils_1.OnedriveUtils);
    }
    async uploadToCloud(Provider, storage, files, email) {
        const provider = new Provider();
        try {
            await provider.initConnection(storage);
            await provider.prepareFolderPath(email);
        }
        catch (error) {
            console.log(error.stack);
            return files;
        }
        for (const file of files) {
            if (file.uploaded)
                continue;
            try {
                await provider.uploadFile(file);
                file.uploaded = true;
                await file_utils_1.deleteFileFromLocal(file);
            }
            catch (error) {
                console.log(error.stack);
                break;
            }
        }
        return files;
    }
    async endRequest(statusCode, message, files) {
        if (files && files.length) {
            await file_utils_1.deleteFilesFromLocal(files);
        }
        const uploadedFilenames = files
            .filter(file => file.uploaded)
            .map(file => file.filename);
        return this.responseHelperService.sendResponse(statusCode, message, null, uploadedFilenames);
    }
    hasNonUploadedFiles(files) {
        return files.filter(file => !file.uploaded).length > 0;
    }
    async upload(files, userData, data) {
        console.log('-e-', userData.employee_id, '-d-', new Date(), ' === Screenshot received === ', '-em-', userData.email, '-f-', files.length);
        if (files.length === 0) {
            return this.endRequest(404, 'No image file available', files);
        }
        let storage = null;
        let dbStorageData = null;
        try {
            dbStorageData = await this.integrationModel.findOne(userData.organization_id);
            storage = JSON.parse(dbStorageData.organizationproviders.orgProCreds.creds);
        }
        catch (error) {
            return this.endRequest(400, 'Failed to retrieve cloud integration data', files);
        }
        if (!(dbStorageData === null || dbStorageData === void 0 ? void 0 : dbStorageData.short_code)) {
            return this.endRequest(400, 'The cloud provider name is not setup in DB', files);
        }
        const providerCode = dbStorageData.short_code;
        if (!this.providers.has(providerCode)) {
            return this.endRequest(400, `Provider ${providerCode} is not supported`, files);
        }
        try {
            await file_utils_1.saveFiles(files, userData.email, data);
        }
        catch (error) {
            return this.endRequest(500, 'Failed to dump files to disk', files);
        }
        const ProviderClass = this.providers.get(providerCode);
        files = await this.uploadToCloud(ProviderClass, storage, files, userData.email);
        if (this.hasNonUploadedFiles(files)) {
            const retryTimeoutSeconds = Number(process.env.RETRY_TIMEOUT_SECONDS) || 5;
            await new Promise(resolve => setTimeout(() => resolve(), retryTimeoutSeconds * 1000));
            await this.uploadToCloud(ProviderClass, storage, files, userData.email);
        }
        if (this.hasNonUploadedFiles(files)) {
            return this.endRequest(400, 'Failed screenshots uploading', files);
        }
        else {
            return this.endRequest(200, 'Successfully screenshot uploaded', files);
        }
    }
};
ScreenshotService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [response_helper_service_1.ResponseHelperService, typeof (_a = typeof integraion_model_1.IntegrationModel !== "undefined" && integraion_model_1.IntegrationModel) === "function" ? _a : Object])
], ScreenshotService);
exports.ScreenshotService = ScreenshotService;
//# sourceMappingURL=screenshot.service.js.map