import { IMovieTmdb } from 'src/common/interface';

export interface IMovieExternalRepository {
  getMoviesPopular: () => Promise<IMovieTmdb[]>;
}
