"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityDataSchema = void 0;
const activity_data_enum_1 = require("../../../common/enums/activity-data.enum");
const mongoose_1 = require("mongoose");
const moment = require("moment-timezone");
exports.UserActivityDataSchema = new mongoose_1.Schema({
    userId: { type: Number, required: true },
    userEmail: { type: String, required: true },
    adminId: { type: Number, required: true },
    dataId: { type: String, required: true },
    systemTimeUtc: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    timestampInUtc: { type: Number, default: moment().utc().format('X'), required: true },
    timestampServer: { type: Number, default: moment().format('X'), required: true },
    timestampActual: { type: Number, default: moment().format('X'), required: true },
    projectId: { type: Number, required: true, default: 0 },
    taskId: { type: Number, required: true, default: 0 },
    breakInSeconds: { type: Number, required: true, default: 0 },
    taskNote: { type: String, default: '' },
    appVersion: { type: String, default: '' },
    clicksCount: { type: Number, required: true, default: 0 },
    fakeActivitiesCount: { type: Number, required: true, default: 0 },
    keysCount: { type: Number, required: true, default: 0 },
    movementsCount: { type: Number, required: true, default: 0 },
    activityPerSecond: {
        buttonClicks: { type: [Number], required: true },
        fakeActivities: { type: [Number], required: true },
        keystrokes: { type: [Number], required: true },
        mouseMovements: { type: [Number], required: true }
    },
    mode: {
        name: { type: String, required: true, default: 'computer' },
        start: { type: Number, required: true, default: 0 },
        end: { type: Number, required: true, default: 0 }
    },
    appUsage: [{
            ageOfData: { type: Number, required: true, default: -1 },
            app: { type: String, required: true, default: null },
            start: { type: Number, required: true, default: -1 },
            end: { type: Number, required: true, default: -1 },
            title: { type: String, default: '' },
            url: { type: String, default: 'null' },
            keystrokes: { type: String, default: '' },
        }],
    status: { type: Number, default: activity_data_enum_1.EActivityDataStatus.active }
}, { timestamps: true, autoIndex: true });
//# sourceMappingURL=user-activity-data.schema.js.map