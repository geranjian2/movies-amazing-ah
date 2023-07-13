import { Module } from '@nestjs/common';
import { MongoModule } from 'src/infrastructure/implementations/mongo/mongo.module';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [MongoModule],
  controllers: [UserController],
  providers: [],
})
export class HttpMongoModule {}
