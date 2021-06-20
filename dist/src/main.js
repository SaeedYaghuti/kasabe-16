"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const adapters_init_1 = require("./adapters.init");
async function bootstrap() {
    const logger = new common_1.Logger('bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    adapters_init_1.initAdapters(app);
    const port = 3000;
    await app.listen(port);
    logger.verbose(`Application is Listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map