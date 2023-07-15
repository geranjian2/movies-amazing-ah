import { Module } from '@nestjs/common';
import { MongoModule } from 'src/infrastructure/implementations/mongo/mongo.module';
import { UserController } from './controllers/user.controller';
import { MovieController } from './controllers/movie.controller';
import { MovieService } from 'src/application/uses-cases';
import { FavoriteMoviesController } from './controllers/favorite-movies.controller';
import { FavoriteMoviesService } from 'src/application/uses-cases/favorite-movies/favorite-movies.service';
import { UserService } from 'src/application/uses-cases/user/user.service';

@Module({
  imports: [MongoModule],
  controllers: [UserController, MovieController, FavoriteMoviesController],
  providers: [MovieService, FavoriteMoviesService, UserService],
})
export class HttpMongoModule {}
