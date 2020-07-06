"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EActivityDataMode = exports.EActivityDataStatus = void 0;
var EActivityDataStatus;
(function (EActivityDataStatus) {
    EActivityDataStatus[EActivityDataStatus["inactive"] = 0] = "inactive";
    EActivityDataStatus[EActivityDataStatus["active"] = 1] = "active";
    EActivityDataStatus[EActivityDataStatus["processing"] = 2] = "processing";
    EActivityDataStatus[EActivityDataStatus["processed"] = 3] = "processed";
    EActivityDataStatus[EActivityDataStatus["failedOnce"] = 4] = "failedOnce";
    EActivityDataStatus[EActivityDataStatus["failedTwice"] = 5] = "failedTwice";
    EActivityDataStatus[EActivityDataStatus["failedThrice"] = 6] = "failedThrice";
})(EActivityDataStatus = exports.EActivityDataStatus || (exports.EActivityDataStatus = {}));
var EActivityDataMode;
(function (EActivityDataMode) {
    EActivityDataMode["computer"] = "computer";
    EActivityDataMode["remote"] = "remote";
})(EActivityDataMode = exports.EActivityDataMode || (exports.EActivityDataMode = {}));
//# sourceMappingURL=activity-data.enum.js.map