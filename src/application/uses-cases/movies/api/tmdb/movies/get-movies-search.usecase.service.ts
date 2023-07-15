import { Inject, Injectable } from '@nestjs/common';
import { IMOVIES_EXTERNAL_SHARED } from 'src/common/constants';
import { IMovieTmdb } from 'src/common/interface';
import { IMovieExternalRepository } from 'src/domain/repository';

@Injectable()
export class GetMoviesPopularCaseUse {
  constructor(
    @Inject(IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY)
    private movieExternalRepository: IMovieExternalRepository,
  ) {}

  async run(): Promise<IMovieTmdb[]> {
    return this.movieExternalRepository.getMoviesPopular();
  }
}
