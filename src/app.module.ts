import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpMongoModule } from './infrastructure/drinving-adapters/http/mongo/http-mongo.module';
import { HttpIntegrationsModule } from './infrastructure/drinving-adapters/http/integrations/http-integrations.module';
import { HttpAuthModule } from './infrastructure/drinving-adapters/http/auth/http-auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),

    HttpMongoModule,
    HttpIntegrationsModule,
    HttpAuthModule,
    MongooseModule.forRoot(process.env.URI_MONGODB),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
