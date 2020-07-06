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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFeatureService = void 0;
const common_1 = require("@nestjs/common");
const response_helper_service_1 = require("../../../../common/helper/response.helper.service");
let UserFeatureService = class UserFeatureService {
    constructor(responseHelperService) {
        this.responseHelperService = responseHelperService;
    }
    async fetchFeature() {
        return this.responseHelperService.sendResponse(200, 'Status fetched', null, {
            system: {
                type: 'personal',
                visibility: false,
                info: { type: 'personal or office', visibility: 'true-visible mode , false-stealth mode' }
            },
            screenshot: {
                frequencyPerHour: 30,
                employeeAccessibility: false,
                employeeCanDelete: false
            },
            breakInMinute: 30,
            idleInMinute: 2,
            trackingMode: 'unlimited',
            tracking: {
                unlimited: {
                    day: '1,2,3,4,5,6,7',
                    info: { day: '1-monday,7-sunday', time: 'all day' }
                },
                fixed: {
                    mon: {
                        status: true,
                        time: { start: '10:00', end: '19:00' }
                    },
                    tue: {
                        status: true,
                        time: { start: '10:00', end: '19:00' }
                    },
                    wed: {
                        status: false,
                        time: { start: '10:00', end: '19:00' }
                    },
                    thu: {
                        status: true,
                        time: { start: '10:00', end: '19:00' }
                    },
                    fri: {
                        status: true,
                        time: { start: '10:00', end: '19:00' }
                    },
                    sat: {
                        status: true,
                        time: { start: '10:00', end: '15:00' }
                    },
                    sun: {
                        status: false,
                        time: { start: '10:00', end: '19:00' }
                    },
                    info: { day: '1-monday,7-sunday', time: 'fixed, else dont track', status: 'true means track else no tracking that day' }
                },
                networkBased: {
                    networkName: 'Globussoft',
                    networkMac: '00-14-22-01-23-45',
                    info: {
                        other: 'only track when system in on particular network',
                    }
                },
                manual: {
                    info: {
                        other: 'when user will start tracking clock-in and stops when clock-out',
                    }
                },
                projectBased: {
                    info: {
                        other: 'when user will start working on a project',
                    }
                }
            },
            task: {
                employeeCanCreateTask: true,
                info: {
                    employeeCanCreateTask: 'either true or false',
                }
            }
        });
    }
};
UserFeatureService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [response_helper_service_1.ResponseHelperService])
], UserFeatureService);
exports.UserFeatureService = UserFeatureService;
//# sourceMappingURL=user-feature.service.js.map