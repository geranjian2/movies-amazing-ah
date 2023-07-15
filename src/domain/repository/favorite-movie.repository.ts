import { FavoriteMovieModel } from '../models';
import { IBaseRepository } from './base.repository';

export interface IFavoriteMovieRepository
  extends IBaseRepository<FavoriteMovieModel> {
  data?: string;
}
