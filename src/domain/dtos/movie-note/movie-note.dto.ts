import { ApiProperty } from '@nestjs/swagger';
import { MovieModel, MovieNoteModel, UserModel } from 'src/domain/models';
import { UserDto } from '../user/user.dto';

export class CreateNoteMovieDto {
  @ApiProperty()
  movieId: string;
  @ApiProperty()
  noteTitle: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  userId: string;
}

export class UpdatePartialNoteMovieDto {
  @ApiProperty()
  _id?: string;
  @ApiProperty()
  noteTitle: string;
}

export class MovieNoteDto {
  constructor(register: MovieNoteModel) {
    this._id = register._id;
    this.movie = register.movie;
    this.noteTitle = register.noteTitle;
    this.description = register.description;
    this.user = new UserDto(register.user);
  }
  @ApiProperty()
  _id: string;
  @ApiProperty()
  movie: MovieModel;
  @ApiProperty()
  noteTitle: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  user: UserModel;
}
