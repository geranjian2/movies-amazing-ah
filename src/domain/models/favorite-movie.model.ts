import { MovieModel } from './movie.model';
import { UserModel } from './user.model';

export class FavoriteMovieModel {
  _id: string;
  createdAt?;
  movie?: MovieModel;
  user?: UserModel;
}
