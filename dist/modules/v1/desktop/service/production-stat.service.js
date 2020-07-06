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
exports.ProductionStatsService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment-timezone");
const response_helper_service_1 = require("../../../../common/helper/response.helper.service");
const production_stats_model_1 = require("src/database/sequelize-db/models/production-stats.model");
let ProductionStatsService = class ProductionStatsService {
    constructor(responseHelperService, productionStatsModel) {
        this.responseHelperService = responseHelperService;
        this.productionStatsModel = productionStatsModel;
    }
    async getProductionStarts(userData) {
        let day = '2020-10-12';
        const productionStarts = await this.productionStatsModel.getproductionStartData(userData.employee_id);
        return productionStarts;
    }
};
ProductionStatsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [response_helper_service_1.ResponseHelperService, typeof (_a = typeof production_stats_model_1.ProductionStatsModel !== "undefined" && production_stats_model_1.ProductionStatsModel) === "function" ? _a : Object])
], ProductionStatsService);
exports.ProductionStatsService = ProductionStatsService;
let getProductionStarts = async (userData, sessions) => {
    const user = userData;
    if (!user || !user.employee_id || !user.organization_id) {
        return { code: 400, error: 'Check session id', data: null, message: 'User/Admin id is missing' };
    }
    if (!sessions || sessions.length === 0) {
        return { code: 400, error: 'No sesions data', data: null, message: 'Sessions data is missing' };
    }
    try {
        const userId = user.employee_id;
        const adminId = user.organization_id;
        const email = user.email;
        const errors = [], success = [];
        const dbOperations = {};
        let login_time = null;
        let logout_time = null;
        let day = null;
        let login_day = null;
        let working_hours = null;
        let non_working_hours = null;
        let total_hours = null;
        let is_report_generated = null;
        let newEntryMade = 0;
        let log_sheet_id = null;
        let existingData = false;
        let insertData = [];
        let t_sec = 0;
        let w_sec = 0;
        let n_sec = 0;
        const columns = `*`;
        const filter = `user_id = ${userId} AND admin_id = ${adminId}`;
        const productionStatData = await this.productionStatsModel.getproductionStartData(userData.employee_id);
        if (productionStatData && productionStatData.length > 0) {
            existingData = true;
            login_time = moment(productionStatData[0].login_time).tz('Africa/Bamako');
            logout_time = moment(productionStatData[0].logout_time).tz('Africa/Bamako');
            day = productionStatData[0].day;
            working_hours = productionStatData[0].working_hours;
            non_working_hours = productionStatData[0].non_working_hours;
            total_hours = productionStatData[0].total_hours;
            is_report_generated = productionStatData[0].is_report_generated;
            log_sheet_id = productionStatData[0].log_sheet_id;
            t_sec = productionStatData[0].t_sec;
            w_sec = productionStatData[0].w_sec;
            n_sec = productionStatData[0].n_sec;
        }
        for (let i = 0; i < sessions.length; i++) {
            if (!existingData) {
                login_time = moment(sessions[i].startTime).tz('Africa/Bamako');
                login_day = login_time.clone().tz(user.timezone).format('YYYY-MM-DD');
                logout_time = moment(sessions[i].endTime).tz('Africa/Bamako');
                day = login_day;
                let dateDifference = moment.duration(logout_time.diff(login_time)).asSeconds();
                if (sessions[i].activeSeconds > dateDifference) {
                    sessions[i].activeSeconds = dateDifference;
                }
                t_sec = moment.duration(logout_time.diff(login_time)).asSeconds();
                w_sec = w_sec + sessions[i].activeSeconds;
                n_sec = t_sec - w_sec;
                total_hours = moment().set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0, date: 1, month: 1, year: 2020 }).add(moment.duration(logout_time.diff(login_time)), 'milliseconds').format('HH:mm:ss');
                working_hours = moment().set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0, date: 1, month: 1, year: 20200 }).add(sessions[i].activeSeconds, 'seconds').format('HH:mm:ss');
                non_working_hours = moment().set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0, date: 1, month: 1, year: 2020 }).add(moment.duration(logout_time.diff(login_time)), 'milliseconds').subtract(sessions[i].activeSeconds, 'seconds').format('HH:mm:ss');
                newEntryMade = 1;
                is_report_generated = 0;
                log_sheet_id = email + day;
                dbOperations[`${log_sheet_id}`] = {
                    'type': 'insert', 'data': {
                        login_time: login_time.format('YYYY-MM-DD HH:mm:ss'),
                        log_sheet_id,
                        logout_time: logout_time.format('YYYY-MM-DD HH:mm:ss'),
                        total_hours,
                        day,
                        working_hours,
                        non_working_hours,
                        t_sec,
                        w_sec,
                        n_sec
                    }
                };
                existingData = true;
            }
            else {
                let loopStartDate = moment(sessions[i].startTime).tz('Africa/Bamako');
                let loopStartDay = moment(sessions[i].startTime).tz('Africa/Bamako').format('YYYY-MM-DD');
                let loopEndDate = moment(sessions[i].endTime).tz('Africa/Bamako');
                let TimeDifference = moment.duration(loopStartDate.diff(logout_time)).asHours();
                if ((TimeDifference > 8 && loopStartDay !== day) || moment.duration(loopStartDate.diff(login_time)).asHours() > 24) {
                    if (newEntryMade == 1) {
                        let update = `
                                    day ="${day}",
                                    login_time ="${login_time}",
                                    logout_time ="${logout_time}",
                                    working_hours ="${working_hours}",
                                    non_working_hours ="${non_working_hours}",
                                    total_hours ="${total_hours}",
                                    is_report_generated =${is_report_generated},
                                    w_sec = ${w_sec},
                                    t_sec = ${t_sec},
                                    n_sec = ${n_sec}
                                `;
                        dbOperations[`${log_sheet_id}`].data = {
                            login_time: login_time.format('YYYY-MM-DD HH:mm:ss'),
                            logout_time: logout_time.format('YYYY-MM-DD HH:mm:ss'),
                            log_sheet_id,
                            total_hours,
                            day,
                            working_hours,
                            non_working_hours,
                            t_sec,
                            w_sec,
                            n_sec
                        };
                    }
                    log_sheet_id = email + loopStartDate.format('YYYY-MM-DD');
                    login_time = loopStartDate;
                    logout_time = loopEndDate;
                    let dateDifference = moment.duration(logout_time.diff(login_time)).asSeconds();
                    if (sessions[i].activeSeconds > dateDifference) {
                        sessions[i].activeSeconds = dateDifference;
                    }
                    total_hours = moment().set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0, date: 1, month: 1, year: 2020 }).add(moment.duration(logout_time.diff(login_time)), 'milliseconds').format('HH:mm:ss');
                    working_hours = moment().set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0, date: 1, month: 1, year: 2020 }).add(sessions[i].activeSeconds, 'seconds').format('HH:mm:ss');
                    non_working_hours = moment().set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0, date: 1, month: 1, year: 2020 }).add(moment.duration(logout_time.diff(login_time)), 'milliseconds').subtract(sessions[i].activeSeconds, 'seconds').format('HH:mm:ss');
                    t_sec = moment.duration(logout_time.diff(login_time)).asSeconds();
                    w_sec = sessions[i].activeSeconds;
                    n_sec = t_sec - w_sec;
                    newEntryMade = 1;
                    login_day = moment(sessions[i].startTime).format('YYYY-MM-DD');
                    day = login_day;
                    dbOperations[`${log_sheet_id}`] = {
                        'type': 'insert', 'data': {
                            login_time: login_time.format('YYYY-MM-DD HH:mm:ss'),
                            log_sheet_id,
                            day,
                            logout_time: logout_time.format('YYYY-MM-DD HH:mm:ss'),
                            total_hours,
                            working_hours,
                            non_working_hours,
                            w_sec,
                            n_sec,
                            t_sec,
                        }
                    };
                }
                else {
                    logout_time = loopEndDate;
                    let tempWorkinHrs = working_hours.split(':');
                    login_day = login_time.clone().tz(user.timezone).format('YYYY-MM-DD');
                    day = login_day;
                    let dateDifference = moment.duration(logout_time.diff(login_time)).asSeconds();
                    if (sessions[i].activeSeconds > dateDifference) {
                        sessions[i].activeSeconds = dateDifference;
                    }
                    total_hours = moment().tz('Africa/Bamako').set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0, date: 1, month: 1, year: 2020 }).add(moment.duration(logout_time.diff(login_time)), 'seconds');
                    working_hours = moment().set({ hours: tempWorkinHrs[0], minutes: tempWorkinHrs[1], seconds: tempWorkinHrs[2], milliseconds: 0, date: 1, month: 1, year: 2020 }).add(sessions[i].activeSeconds, 'seconds');
                    non_working_hours = moment.duration(total_hours.diff(working_hours)).asSeconds();
                    non_working_hours = moment().set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0, date: 1, month: 1, year: 2020 }).add(non_working_hours, 'seconds').format('HH:mm:ss');
                    total_hours = total_hours.format('HH:mm:ss');
                    working_hours = working_hours.format('HH:mm:ss');
                    t_sec = moment.duration(logout_time.diff(login_time)).asSeconds();
                    w_sec = w_sec + sessions[i].activeSeconds;
                    n_sec = t_sec - w_sec;
                    if (dbOperations.hasOwnProperty(`${log_sheet_id}`)) {
                        dbOperations[`${log_sheet_id}`].data = {
                            type: log_sheet_id,
                            day,
                            login_time: login_time.format('YYYY-MM-DD HH:mm:ss'),
                            logout_time: logout_time.format('YYYY-MM-DD HH:mm:ss'),
                            total_hours,
                            working_hours,
                            non_working_hours,
                            w_sec: w_sec,
                            n_sec: n_sec,
                            t_sec: t_sec
                        };
                    }
                    else {
                        dbOperations[`${log_sheet_id}`] = {
                            'type': 'update', 'data': {
                                log_sheet_id,
                                day,
                                login_time: login_time.format('YYYY-MM-DD HH:mm:ss'),
                                logout_time: logout_time.format('YYYY-MM-DD HH:mm:ss'),
                                total_hours,
                                working_hours,
                                non_working_hours,
                                w_sec: w_sec,
                                n_sec: n_sec,
                                t_sec: t_sec
                            }
                        };
                    }
                }
            }
        }
        for (let key in dbOperations) {
            if (dbOperations[key].type === 'update') {
                const updateStatus = await this.productionStatsModel.updateProductionStat(dbOperations[key].data.log_sheet_id, dbOperations[key].data.logout_time, dbOperations[key].data.working_hours, dbOperations[key].data.non_working_hours, dbOperations[key].data.total_hours, dbOperations[key].data.w_sec, dbOperations[key].data.n_sec, dbOperations[key].data.t_sec);
                if (!updateStatus)
                    errors.push(new Error(`Some error occured while updated ${key}`));
                else
                    success.push(updateStatus);
            }
            else {
                console.log('cacaacaca');
                let tempData = dbOperations[key].data;
                const insertStatus = await this.productionStatsModel.addProductionStats(key, tempData.day, tempData.login_time, tempData.logout_time, userId, adminId, tempData.working_hours, tempData.non_working_hours, tempData.total_hours, w_sec, t_sec, n_sec);
                success.push(insertStatus);
            }
        }
        return { error: errors, data: success };
    }
    catch (err) {
        return { error: err, data: null };
    }
};
[
    {
        "id": "1589488611.0631332",
        "startTime": "2020-05-14T20:36:51",
        "activeSeconds": 180,
        "endTime": "2020-05-14T20:40:52",
        "dataSubmitted": false
    }
];
//# sourceMappingURL=production-stat.service.js.map