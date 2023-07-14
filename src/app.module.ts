import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HttpMongoModule } from './infrastructure/drinving-adapters/http/mongo/http-mongo.module';
import { HttpIntegrationsModule } from './infrastructure/drinving-adapters/http/integrations/http-integrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    HttpMongoModule,
    HttpIntegrationsModule,
    MongooseModule.forRoot(process.env.URI_MONGODB),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
