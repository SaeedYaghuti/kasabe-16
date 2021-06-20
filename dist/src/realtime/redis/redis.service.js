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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const redis_constants_1 = require("./redis.constants");
let RedisService = class RedisService {
    constructor(redisSubscriberClient, redisPublisherClient, redisDB) {
        this.redisSubscriberClient = redisSubscriberClient;
        this.redisPublisherClient = redisPublisherClient;
        this.redisDB = redisDB;
        this.logger = new common_1.Logger('RedisService');
    }
    fromEvent(eventName) {
        this.redisSubscriberClient.subscribe(eventName);
        return new rxjs_1.Observable((observer) => this.redisSubscriberClient.on('message', (channel, message) => observer.next({ channel, message }))).pipe(operators_1.tap(({ channel, message }) => {
            this.logger.log(`[APP_FLOW: 13 (repeat)] - Redis.on('message') wanted eventName: ${eventName}; recived> ${JSON.stringify(channel)}`);
        }), operators_1.filter(({ channel }) => channel === eventName), operators_1.map(({ message }) => JSON.parse(message)));
    }
    async publish(channel, value) {
        this.logger.log(`[APP_FLOW:  10 ] - publish() arguments: channel> ${JSON.stringify(channel)}, value ${JSON.stringify(value)}`);
        return new Promise((resolve, reject) => {
            return this.redisPublisherClient.publish(channel, JSON.stringify(value), (error, reply) => {
                this.logger.log(`[APP_FLOW: 16 ] -  Redis publish callback > reply: ${JSON.stringify(reply)}, error ${JSON.stringify(error)};`);
                if (error) {
                    return reject(error);
                }
                return resolve(reply);
            });
        });
    }
    async setFollowings(client_id, followed_ids) {
        this.logger.log(`[APP_FLOW:  16 ] - setSubscriberstoClient() arguments: follower_id> ${JSON.stringify(client_id)}, following_ids> ${JSON.stringify(followed_ids)}`);
        return Promise.all(followed_ids.map(followed_id => {
            return new Promise((resolve, reject) => {
                return this.redisDB.sadd(followed_id + ":followers", client_id, (error, reply) => {
                    this.logger.log(`[APP_FLOW: 17 ] -  RedisDB.sadd() callback > reply: ${JSON.stringify(reply)}, error ${JSON.stringify(error)};`);
                    if (error) {
                        return reject(error);
                    }
                    return resolve(reply);
                });
            })
                .catch(err => { console.log(`<Esl> err redisDB.sadd(followed_id: ${followed_id}) while`, err); return -1; });
        }));
    }
    async getFollowers(client_id) {
        this.logger.log(`[APP_FLOW:  15 ] - getClientFlowers() arguments: client_id> ${JSON.stringify(client_id)}`);
        return new Promise((resolve, reject) => {
            return this.redisDB.smembers(client_id + ":followers", (error, reply) => {
                this.logger.log(`[APP_FLOW: 17 ] -  RedisDB.smembers() callback > reply: ${JSON.stringify(reply)}, error ${JSON.stringify(error)};`);
                if (error) {
                    return reject(error);
                }
                return resolve(reply);
            });
        });
    }
};
RedisService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(redis_constants_1.REDIS_SUBSCRIBER_CLIENT)),
    __param(1, common_1.Inject(redis_constants_1.REDIS_PUBLISHER_CLIENT)),
    __param(2, common_1.Inject(redis_constants_1.REDIS_DB)),
    __metadata("design:paramtypes", [Object, Object, Object])
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map