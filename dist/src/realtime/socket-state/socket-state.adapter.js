"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const log_color_1 = require("../../util/log_color");
class SocketStateAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app, socketStateService) {
        super(app);
        this.app = app;
        this.socketStateService = socketStateService;
        this.logger = new common_1.Logger('SocketStateAdapter');
    }
    create(port, options = {}) {
        this.logger.log('[APP_FLOW: 1 ] : CREATE(); create() socket instance; add authentication to it ');
        const server = super.createIOServer(port, options);
        this.socketStateService.injectSocketServer(server);
        server.use(async (socket, next) => {
            var _a, _b;
            const token = ((_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.token) || ((_b = socket.handshake.headers) === null || _b === void 0 ? void 0 : _b.authorization);
            this.logger.log('[APP_FLOW: 1 ] : token: ' + token);
            if (!token) {
                socket.auth = null;
                return next();
            }
            try {
                socket.auth = {
                    authId: parseInt(token),
                };
                return next();
            }
            catch (e) {
                return next(e);
            }
        });
        return server;
    }
    bindClientConnect(server, callback) {
        this.logger.log('[APP_FLOW: 2 ] : bindClientConnect(); when socket connect we add it to arrya and add some event listener');
        server.on('connection', (socket) => {
            if (socket.auth) {
                this.socketStateService.add(socket.auth.authId, socket);
                socket.on('disconnect', () => {
                    this.socketStateService.remove(socket.auth.authId, socket);
                    socket.removeAllListeners('disconnect');
                });
            }
            callback(socket);
        });
    }
    bindMessageHandlers(socket, handlers, process) {
        this.logger.log('[APP_FLOW: 3 ] : bindMessageHandlers(); bind handler with socket event ');
        handlers.forEach(({ message, callback }) => {
            rxjs_1.fromEvent(socket, message)
                .pipe(operators_1.tap(data => {
                this.logger.log(`[APP_FLOW: 4 - Start_Routine ] : A socket has sent data> : ${JSON.stringify(data)} to server by event name> ${JSON.stringify(message)}`);
            }), operators_1.mergeMap(data => process(callback(data))), operators_1.tap(result => {
                this.logger.log(`[APP_FLOW: 11 ] - mergeMap result>  ${JSON.stringify(result)}`);
            }), operators_1.filter(result => !!result && result.event))
                .subscribe(({ event, data }) => {
                this.logger.log(`[APP_FLOW: 12 ] - subscribe(): eviting event to client event> ${JSON.stringify(event)}, data> ${JSON.stringify(data)}`);
            });
        });
    }
}
exports.SocketStateAdapter = SocketStateAdapter;
//# sourceMappingURL=socket-state.adapter.js.map