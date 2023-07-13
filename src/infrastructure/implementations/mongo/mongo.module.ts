import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MovieSchema, UserSchema } from 'src/common/schemas/mongo';
import { UserRepository } from './user/user.repository';
import { MoviesTmbdModule } from 'src/common/provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Movie', schema: MovieSchema },
    ]),
    MoviesTmbdModule,
  ],
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class MongoModule {}
