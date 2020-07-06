"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileFromLocal = exports.deleteFilesFromLocal = exports.saveFiles = exports.imageFileFilter = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
exports.imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new common_1.NotAcceptableException('Only image files are allowed'), false);
    }
    if (!file.originalname.match(/^\d{2}-\d{4}-\d{2}-\d{2} \d{2}-\d{2}-\d{2}-\w{3}\./)) {
        return callback(new common_1.NotAcceptableException(`The file name must match the the DateObject template 'HH-YYYY-MM-DD HH-mm-ss-abc.ext'`), false);
    }
    callback(null, true);
};
exports.saveFiles = async (files, email, data) => {
    const folderPath = path_1.join(path_1.resolve(process.env.UPLOAD_PATH), email);
    if (!(await checkPathExistence(folderPath))) {
        await fs_1.promises.mkdir(folderPath);
    }
    const { projectId, taskId } = data;
    for (const file of files) {
        file.filename = `${projectId}-${taskId}-${file.originalname}`;
        file.filepath = path_1.join(folderPath, file.filename);
        await fs_1.promises.writeFile(file.filepath, file.buffer);
        delete file.buffer;
    }
};
exports.deleteFilesFromLocal = async (files) => {
    for (const file of files) {
        await exports.deleteFileFromLocal(file);
    }
};
exports.deleteFileFromLocal = async (file) => {
    await fs_1.promises.unlink(file.filepath).catch(() => { });
};
async function checkPathExistence(path) {
    try {
        await fs_1.promises.access(path);
        return true;
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=file.utils.js.map