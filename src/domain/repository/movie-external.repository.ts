import { IMovieTmdb } from 'src/common/interface';
import { GetParamMovieSearchDto } from 'src/common/standar-dto';

export interface IMovieExternalRepository {
  getMoviesPopular: () => Promise<IMovieTmdb[]>;
  getMoviesSearch: (data: GetParamMovieSearchDto) => Promise<IMovieTmdb[]>;
}
