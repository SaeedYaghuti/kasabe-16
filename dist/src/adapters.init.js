"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_state_adapter_1 = require("./realtime/socket-state/socket-state.adapter");
const socket_state_service_1 = require("./realtime/socket-state/socket-state.service");
exports.initAdapters = (app) => {
    const socketStateService = app.get(socket_state_service_1.SocketStateService);
    app.useWebSocketAdapter(new socket_state_adapter_1.SocketStateAdapter(app, socketStateService));
    return app;
};
//# sourceMappingURL=adapters.init.js.map