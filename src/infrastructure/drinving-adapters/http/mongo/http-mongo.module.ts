import { Module } from '@nestjs/common';
import { MongoModule } from 'src/infrastructure/implementations/mongo/mongo.module';
import { UserController } from './controllers/user.controller';
import { MovieController } from './controllers/movie.controller';
import { MovieService } from 'src/application/uses-cases';

@Module({
  imports: [MongoModule],
  controllers: [UserController, MovieController],
  providers: [MovieService],
})
export class HttpMongoModule {}
