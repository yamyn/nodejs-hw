"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateActivityDataSchema = void 0;
const joi = __importStar(require("@hapi/joi"));
const activity_data_enum_1 = require("../../../../common/enums/activity-data.enum");
const appObjectSchema = joi.object({
    ageOfData: joi.number().integer().valid(-1).optional(),
    app: joi.string().allow(null, '').optional(),
    start: joi.number().integer().positive().allow(0),
    end: joi.number().integer().positive().allow(0),
    title: joi.string().required().trim().allow(null, ''),
    url: joi.string().uri().allow(null, '').required().trim(),
    keystrokes: joi.string().allow(null, '').required().trim(),
}).required();
const appArraySchema = joi.array().items(appObjectSchema).min(1).unique().required();
const sessionEachObjectSchema = joi.object({
    dataId: joi.string().required().trim().isoDate(),
    systemTimeUtc: joi.string().required().trim().isoDate(),
    projectId: joi.number().integer().allow(0).required(),
    taskId: joi.number().integer().allow(0).required(),
    breakInSeconds: joi.number().integer().positive().allow(0).required(),
    clicksCount: joi.number().integer().positive().allow(0),
    fakeActivitiesCount: joi.number().integer().positive().allow(0),
    keysCount: joi.number().integer().positive().allow(0),
    movementsCount: joi.number().integer().positive().allow(0),
    taskNote: joi.string().required().trim().allow(''),
    activityPerSecond: {
        buttonClicks: joi.array().items(joi.number().required()).max(400),
        fakeActivities: joi.array().items(joi.number().required()).max(400),
        keystrokes: joi.array().items(joi.number().required()).max(400),
        mouseMovements: joi.array().items(joi.number().required()).max(400),
    },
    mode: {
        name: joi.string().required().trim().valid(activity_data_enum_1.EActivityDataMode.computer, activity_data_enum_1.EActivityDataMode.remote),
        start: joi.number().integer().positive().allow(0),
        end: joi.number().integer().positive().allow(0),
    },
    appUsage: joi.alternatives().try(appObjectSchema, appArraySchema).required()
});
const sessionArraySchema = joi.array().items(sessionEachObjectSchema).min(1).unique().required();
exports.validateActivityDataSchema = joi.object({
    sign: joi.string().trim().required(),
    data: joi.alternatives().try(sessionEachObjectSchema, sessionArraySchema).required(),
}).required();
//# sourceMappingURL=user-activity.validation.js.map