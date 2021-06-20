"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let SocketStateService = class SocketStateService {
    constructor() {
        this.socketStore = new Map();
        this.sendToSiblingSockets = (eventInfo) => {
            const { authId, socketId, event, data } = eventInfo;
            return this.getAuthSockets(authId)
                .filter((socket) => socket.id !== socketId)
                .forEach((socket) => socket.emit(event, data));
        };
        this.sendToAuth = (eventInfo) => {
            const { authId, excludedSocketId, event, data } = eventInfo;
            return this.getAuthSockets(authId)
                .filter((socket) => socket.id !== excludedSocketId)
                .forEach((socket) => socket.emit(event, data));
        };
        this.sendToGroup = (eventInfo) => {
            return this.getGroupMembers(eventInfo.groupId)
                .forEach((authId) => {
                const authEventInfo = Object.assign({ authId: authId }, eventInfo);
                this.sendToAuth(authEventInfo);
            });
        };
        this.emitToAllAuth = (eventInfo) => {
            this.socketServer.emit(eventInfo.event, eventInfo.data);
        };
        this.emitToAllAuthenticatedAuth = (eventInfo) => {
            const { event, data } = eventInfo;
            return this.getAll()
                .forEach((socket) => socket.emit(event, data));
        };
    }
    injectSocketServer(server) {
        this.socketServer = server;
    }
    remove(authId, socket) {
        const existingSockets = this.socketStore.get(authId);
        if (!existingSockets) {
            return true;
        }
        const sockets = existingSockets.filter(s => s.id !== socket.id);
        if (!sockets.length) {
            this.socketStore.delete(authId);
        }
        else {
            this.socketStore.set(authId, sockets);
        }
        return true;
    }
    removeAll() {
        this.socketStore.clear();
        return true;
    }
    add(authId, socket) {
        const existingSockets = this.socketStore.get(authId) || [];
        const sockets = [...existingSockets, socket];
        this.socketStore.set(authId, sockets);
        return true;
    }
    getAuthSockets(authId) {
        return this.socketStore.get(authId) || [];
    }
    getGroupMembers(groupId) {
        const membersAuthId = [1, 2, 3];
        return membersAuthId;
    }
    getAll() {
        const all = [];
        for (let sockets of this.socketStore.values()) {
            all.push(...sockets);
        }
        return all;
    }
    getSocketStore() {
        return this.socketStore.keys();
    }
    getSocketsSize() {
        return this.socketStore.size;
    }
    propagateEvent(eventInfo) {
        if (!eventInfo.authId) {
            return false;
        }
        return true;
    }
};
SocketStateService = __decorate([
    common_1.Injectable()
], SocketStateService);
exports.SocketStateService = SocketStateService;
//# sourceMappingURL=socket-state.service.js.map