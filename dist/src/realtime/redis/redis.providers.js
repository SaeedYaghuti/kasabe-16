"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redis_constants_1 = require("./redis.constants");
exports.redisProviders = [
    {
        useFactory: () => {
            return new ioredis_1.default();
        },
        provide: redis_constants_1.REDIS_SUBSCRIBER_CLIENT,
    },
    {
        useFactory: () => {
            return new ioredis_1.default();
        },
        provide: redis_constants_1.REDIS_PUBLISHER_CLIENT,
    },
    {
        useFactory: () => {
            return new ioredis_1.default();
        },
        provide: redis_constants_1.REDIS_DB,
    },
];
//# sourceMappingURL=redis.providers.js.map