import { Injectable } from '@nestjs/common';
import { IMovieTmdb, IResultITmdb } from 'src/common/interface';
import { MoviesTmbdProviderService } from 'src/common/provider';
import { IMovieExternalRepository } from 'src/domain/repository/movie-external.repository';

@Injectable()
export class MovieExternalImpRepository implements IMovieExternalRepository {
  constructor(
    private readonly moviesTmbdProviderService: MoviesTmbdProviderService,
  ) {}
  getMoviesPopular = async (): Promise<IMovieTmdb[]> => {
    const movies: IResultITmdb =
      await this.moviesTmbdProviderService.getMoviePopular();
    return movies.results;
  };
}
