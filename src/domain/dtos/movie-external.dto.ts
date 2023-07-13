import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MovieExternalModel } from '../models';

export class MovieExternalDto {
  constructor(register: MovieExternalModel) {
    this.adult = register.adult;
    this.backdrop_path = register.backdrop_path;
    this.genre_ids = register.genre_ids;
    this.id = register.id;
    this.original_language = register.original_language;
    this.original_title = register.original_title;
    this.overview = register.overview;
    this.popularity = register.popularity;
    this.poster_path = register.poster_path;
    this.release_date = register.release_date;
    this.title = register.title;
    this.video = register.video;
    this.vote_average = register.vote_average;
    this.vote_count = register.vote_count;
  }

  @ApiProperty()
  adult: boolean;
  @ApiProperty()
  backdrop_path: string;
  @ApiProperty()
  genre_ids: number[];
  @ApiPropertyOptional()
  id: number;
  @ApiProperty()
  original_language: string;
  @ApiProperty()
  original_title: string;
  @ApiProperty()
  overview: string;
  @ApiProperty()
  popularity: number;
  @ApiProperty()
  poster_path: string;
  @ApiProperty()
  release_date: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  video: boolean;
  vote_average: number;
  @ApiProperty()
  vote_count: number;
}
