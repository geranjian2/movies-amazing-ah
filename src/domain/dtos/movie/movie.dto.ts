import { ApiProperty } from '@nestjs/swagger';
import { MovieModel } from 'src/domain/models';

export class MovieDto {
  constructor(register: MovieModel) {
    this.movieIMDBid = register.movieIMDBid;
    this.languaje = register.languaje;
    this.genres = register.genres;
    this.originalLanguaje = register.originalLanguaje;
    this.title = register.title;
    this.overview = register.overview;
    this.popularity = register.popularity;
    this.posterPath = register.posterPath;
    this.realaseDate = register.realaseDate;
    this.video = register.video;
    this.voteAvarage = register.voteAvarage;
    this.voteAcount = register.voteAcount;
  }
  @ApiProperty()
  movieIMDBid;
  @ApiProperty()
  languaje;
  @ApiProperty()
  genres;
  @ApiProperty()
  originalLanguaje;
  @ApiProperty()
  title;
  @ApiProperty()
  overview;
  @ApiProperty()
  popularity;
  @ApiProperty()
  posterPath;
  @ApiProperty()
  realaseDate;
  @ApiProperty()
  video;
  @ApiProperty()
  voteAvarage;
  @ApiProperty()
  voteAcount;
}
