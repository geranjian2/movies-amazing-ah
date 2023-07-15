import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {
  FavoriteMovieSchema,
  MovieNoteSchema,
  MovieSchema,
  UserSchema,
  schema,
} from 'src/common/schemas/mongo';
import { UserRepository } from './user/user.repository';
import { MovieImpRepository } from './movie/movieImp.repository';
import {
  IFAVORITE_MOVIE_SHARED,
  IMOVIES_SHARED,
  INOTES_MOVIE_SHARED,
  IUSER_SHARED,
} from 'src/common/constants';
import { MapperModule } from 'src/common/mappers/mapper.module';
import { FavoriteMovieImpRepository } from './favorite-movies/favorite-movieImp.repository';
import { MovieNoteImpRepository } from './movie-notes/movie-notesImp.repository';

@Module({
  imports: [
    MapperModule,
    MongooseModule.forFeature([
      { name: schema.USER, schema: UserSchema },
      { name: schema.MOVIE, schema: MovieSchema },
      { name: schema.FAVORITE_MOVIE, schema: FavoriteMovieSchema },
      { name: schema.MOVIE_NOTE, schema: MovieNoteSchema },
    ]),
  ],
  controllers: [],
  providers: [
    { provide: IMOVIES_SHARED.IMOVIEREPOSITORY, useClass: MovieImpRepository },
    { provide: IUSER_SHARED.IUSERREPOSITORY, useClass: UserRepository },
    {
      provide: IFAVORITE_MOVIE_SHARED.IFAVORITEMOVIEREPOSITORY,
      useClass: FavoriteMovieImpRepository,
    },
    {
      provide: INOTES_MOVIE_SHARED.IMOVIENOTEREPOSITORY,
      useClass: MovieNoteImpRepository,
    },
  ],
  exports: [
    { provide: IMOVIES_SHARED.IMOVIEREPOSITORY, useClass: MovieImpRepository },
    { provide: IUSER_SHARED.IUSERREPOSITORY, useClass: UserRepository },
    {
      provide: IFAVORITE_MOVIE_SHARED.IFAVORITEMOVIEREPOSITORY,
      useClass: FavoriteMovieImpRepository,
    },
    {
      provide: INOTES_MOVIE_SHARED.IMOVIENOTEREPOSITORY,
      useClass: MovieNoteImpRepository,
    },
  ],
})
export class MongoModule {}
