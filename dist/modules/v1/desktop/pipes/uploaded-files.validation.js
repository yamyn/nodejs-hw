"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadedFilesValidation = void 0;
class UploadedFilesValidation {
    transform(value) {
        if (value.projectId === -1)
            value.projectId = 0;
        if (value.taskId === -1)
            value.taskId = 0;
        return value;
    }
}
exports.UploadedFilesValidation = UploadedFilesValidation;
//# sourceMappingURL=uploaded-files.validation.js.map