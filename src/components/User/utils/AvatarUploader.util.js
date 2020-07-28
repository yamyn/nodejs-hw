const fs = require('fs');
const AvatarGenerator = require('avatar-generator');
const avatar = new AvatarGenerator();
const { s3, setParams } = require('../../../config/cloudDriveConections');
const avatarFolder = 'avatars';

class AvatarUploader {
    async uploadAvatar(email, originalName, path) {
        const absolutePath = this.getAbsolutePath(path);
        const avatar = await this.readFile(absolutePath);
        const format = this.getFormatForName(originalName);

        const link = await this.uploadFile(avatar, email, format);
        await this.removeFile(absolutePath);

        return link;
    }

    getAbsolutePath = path => `${__dirname.split('src')[0]}${path}`;

    getFormatForName(name) {
        const nameParts = name.split('.');

        return nameParts[nameParts.length - 1];
    }

    async uploadFile(file, email, format) {
        const params = setParams({
            Key: `${avatarFolder}/${email}.${format}`,
            Body: file,
            ACL: 'public-read',
        });

        const { Location: link } = await s3.upload(params).promise();

        return link;
    }

    async readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (error, data) => {
                if (error) reject(error);
                resolve(data);
            });
        });
    }

    async removeFile(path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, error => {
                if (error) reject(error);
                resolve();
            });
        });
    }

    async getSimpleAvatar(email, variant) {
        variant = variant ? variant : 'male';
        const image = await avatar.generate(email, variant);

        return image.png();
    }
}

module.exports = new AvatarUploader();
