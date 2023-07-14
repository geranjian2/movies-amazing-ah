import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MovieSchema, UserSchema, schema } from 'src/common/schemas/mongo';
import { UserRepository } from './user/user.repository';
import { MovieImpRepository } from './movie/movieImp.repository';
import { IMOVIES_SHARED } from 'src/common/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: schema.USER, schema: UserSchema },
      { name: schema.MOVIE, schema: MovieSchema },
    ]),
  ],
  controllers: [],
  providers: [
    UserRepository,
    { provide: IMOVIES_SHARED.IMOVIEREPOSITORY, useClass: MovieImpRepository },
  ],
  exports: [
    UserRepository,
    { provide: IMOVIES_SHARED.IMOVIEREPOSITORY, useClass: MovieImpRepository },
  ],
})
export class MongoModule {}
