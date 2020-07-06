"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Util = void 0;
const fs_1 = require("fs");
const AWS = require("aws-sdk");
class S3Util {
    async initConnection(storage) {
        const { client_id, client_secret, bucket_name } = storage;
        this.bucketName = bucket_name;
        this.s3Client = new AWS.S3({ accessKeyId: client_id, secretAccessKey: client_secret });
    }
    async prepareFolderPath(email) {
        this.email = email;
    }
    async uploadFile(file) {
        const day = file.originalname.substr(3, 10);
        const key = `EmpMonitor/${this.email}/${day}/${file.originalname}`;
        const fileContent = await fs_1.promises.readFile(file.filepath);
        const params = {
            Bucket: this.bucketName,
            Key: `${key}`,
            Body: fileContent,
            ACL: 'public-read',
        };
        await this.s3Client.upload(params).promise();
    }
}
exports.S3Util = S3Util;
//# sourceMappingURL=s3.util.js.map