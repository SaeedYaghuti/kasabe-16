import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initAdapters } from './adapters.init';
// import config from 'config';

async function bootstrap() {
  // const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // register global pipes
  app.useGlobalPipes(new ValidationPipe());

  // register global middlewares here
  // app.use(cors(), helmet(), morgan(), multer(), ...);

  initAdapters(app);

  // const port = process.env.PORT || serverConfig.port;
  const port = 3000;
  await app.listen(port);
  
  logger.verbose(`Application is Listening on port ${port}`);
}
bootstrap();
