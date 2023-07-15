import { MovieModel } from './movie.model';
import { UserModel } from './user.model';

export class FavoriteMovieModel {
  createdAt?;
  movie?: MovieModel;
  user?: UserModel;
}
