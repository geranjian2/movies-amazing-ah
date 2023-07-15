import { ApiProperty } from '@nestjs/swagger';
import { FavoriteMovieModel, MovieModel, UserModel } from 'src/domain/models';
import { UserDto } from '../user/user.dto';
import { MovieDto } from '../movie/movie.dto';

export class CreateFavoriteMovieDto {
  @ApiProperty()
  movieId: string;
  @ApiProperty()
  userId: string;
}

export class FavoriteMovieDto {
  constructor(register: FavoriteMovieModel) {
    this.movie = new MovieDto(register.movie);
  }

  @ApiProperty()
  movie: MovieModel;
}
