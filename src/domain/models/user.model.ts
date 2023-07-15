import { FavoriteMovieModel } from './favorite-movie.model';

export class UserModel {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  favoriteMovie?: FavoriteMovieModel;
}
