import { MovieExternalModel } from '../models';

export interface IMovieExternalRepository<T> {
  getPopular: () => Promise<MovieExternalModel[]>;
}
