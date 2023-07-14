import { MovieModel } from '../models';
import { IBaseRepository } from './base.repository';

export interface IMovieRepository extends IBaseRepository<MovieModel> {
  saveBulk: (data: MovieModel[]) => Promise<string>;
}
