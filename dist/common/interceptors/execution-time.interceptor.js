"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionTimeInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ExecutionTimeInterceptor = class ExecutionTimeInterceptor {
    intercept(context, next) {
        const now = Date.now();
        const requestedApiUrl = context.getArgs()[1].req.originalUrl;
        return next.handle().pipe(operators_1.tap(() => {
            return console.log(`${requestedApiUrl} - took ---> ${Date.now() - now} ms to complete.`);
        }));
    }
};
ExecutionTimeInterceptor = __decorate([
    common_1.Injectable()
], ExecutionTimeInterceptor);
exports.ExecutionTimeInterceptor = ExecutionTimeInterceptor;
//# sourceMappingURL=execution-time.interceptor.js.map