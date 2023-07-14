import { Module } from '@nestjs/common';
import { MoviesTmbdModule } from 'src/common/provider';
import { MovieExternalImpRepository } from './movies/movies-external.repository';
import { IMOVIES_EXTERNAL_SHARED } from 'src/common/constants';

@Module({
  imports: [MoviesTmbdModule],
  controllers: [],
  providers: [
    {
      provide: IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY,
      useClass: MovieExternalImpRepository,
    },
  ],
  exports: [
    {
      provide: IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY,
      useClass: MovieExternalImpRepository,
    },
  ],
})
export class ApiModule {}
