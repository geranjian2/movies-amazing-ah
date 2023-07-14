import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { MovieMapper } from './movie.mapper';

@Module({
  imports: [],
  controllers: [],
  providers: [UserMapper, MovieMapper],
  exports: [UserMapper, MovieMapper],
})
export class MapperModule {}
