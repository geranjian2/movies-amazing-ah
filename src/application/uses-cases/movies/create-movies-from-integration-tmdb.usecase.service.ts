import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IMOVIES_EXTERNAL_SHARED, IMOVIES_SHARED } from 'src/common/constants';
import { IMovieTmdb } from 'src/common/interface';
import { MovieMapper } from 'src/common/mappers';
import { MovieModel } from 'src/domain/models';

import { IMovieRepository } from 'src/domain/repository';
import { MovieExternalImpRepository } from 'src/infrastructure/implementations/api/movies/movies-external.repository';

@Injectable()
export class CreateMoviesFromIntegrationTmdbUseCase {
  constructor(
    @Inject(IMOVIES_SHARED.IMOVIEREPOSITORY)
    private movieRepository: IMovieRepository,
    @Inject(IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY)
    private movieExternalRepository: MovieExternalImpRepository,
    private movieMapper: MovieMapper,
  ) {}

  async run(): Promise<string> {
    try {
      const movies: MovieModel[] = [];
      const moviesExternal: IMovieTmdb[] =
        await this.movieExternalRepository.getMoviesPopular();

      moviesExternal.forEach((mExternal) => {
        movies.push(this.movieMapper.toTmdbDomain(mExternal));
      });
      return await this.movieRepository.saveBulk(movies);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
}
