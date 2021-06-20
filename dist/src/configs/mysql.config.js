"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    database: 'chat',
    entities: [__dirname + '/../**/*.entity.{js, ts}'],
    synchronize: true,
};
//# sourceMappingURL=mysql.config.js.map