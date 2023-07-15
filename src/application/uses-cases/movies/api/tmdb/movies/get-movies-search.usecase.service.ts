import { Inject, Injectable } from '@nestjs/common';
import { IMOVIES_EXTERNAL_SHARED } from 'src/common/constants';
import { IMovieTmdb } from 'src/common/interface';
import { GetParamMovieSearchDto } from 'src/common/standar-dto';
import { IMovieExternalRepository } from 'src/domain/repository';

@Injectable()
export class GetMoviesSearchCaseUse {
  constructor(
    @Inject(IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY)
    private movieExternalRepository: IMovieExternalRepository,
  ) {}

  async run(data: GetParamMovieSearchDto): Promise<IMovieTmdb[]> {
    return this.movieExternalRepository.getMoviesSearch(data);
  }
}
