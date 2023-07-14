import { MovieModel } from '../models';
import { IBaseRepository } from './base.repository';

export type IFavoriteMovieRepository = IBaseRepository<MovieModel>;
