import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;
  initSwagger(app);

  await app.listen(port);
}
bootstrap();
