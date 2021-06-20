"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresqlConfig = {
    type: 'postgres',
    host: process.env.RDS_HOSTNAME || 'localhost',
    port: 5433,
    password: process.env.RDS_PASSWORD || 'rootpass',
    database: process.env.RDS_DB_NAME || 'chat',
    entities: [__dirname + '/../**/*.entity.{js, ts}'],
    synchronize: true,
    keepConnectionAlive: true,
};
'u';
//# sourceMappingURL=pg.dev.config.js.map