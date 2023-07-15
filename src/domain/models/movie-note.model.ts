import { MovieModel } from './movie.model';
import { UserModel } from './user.model';

export class MovieNoteModel {
  _id?: string;
  noteTitle: string;
  description: string;
  createdAt?: Date;
  user: UserModel;
  movie: MovieModel;
}
