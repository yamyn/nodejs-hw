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
exports.UpdateClockInClockOutDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateClockInClockOutDTO {
}
__decorate([
    swagger_1.ApiProperty({
        description: `"data" is the array of all the data for the session.<br />
            It is an array of json object having all the data of clock-in clock-out`,
        required: true,
        type: 'array',
        default: [],
        items: {
            properties: {
                type: {
                    type: 'number', default: 1, example: 1, description: '1 is for ClockIn/ClockOut <br /> 2 is for Break taken', enum: [1, 2]
                },
                mode: {
                    type: 'number', default: 1, example: 1, description: '1 - <br /> 2 - Manual', enum: [1, 2]
                },
                startDate: {
                    type: 'string', default: null, example: new Date().toISOString(), description: 'When the clock starts / break starts'
                },
                endDate: {
                    type: 'string', default: null, example: new Date().toISOString(), description: 'When the clock ends / break ends'
                }
            },
        }
    }),
    __metadata("design:type", Array)
], UpdateClockInClockOutDTO.prototype, "data", void 0);
exports.UpdateClockInClockOutDTO = UpdateClockInClockOutDTO;
//# sourceMappingURL=update-clock.dto.js.map