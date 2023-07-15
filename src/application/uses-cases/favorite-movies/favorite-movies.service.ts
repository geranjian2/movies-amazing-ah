import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IFAVORITE_MOVIE_SHARED } from 'src/common/constants';
import {
  CreateFavoriteMovieDto,
  FavoriteMovieDto,
  UserDto,
} from 'src/domain/dtos';
import { FavoriteMovieModel, MovieModel, UserModel } from 'src/domain/models';
import { IFavoriteMovieRepository } from 'src/domain/repository';

@Injectable()
export class FavoriteMoviesService {
  constructor(
    @Inject(IFAVORITE_MOVIE_SHARED.IFAVORITEMOVIEREPOSITORY)
    private favoriteMovieRepository: IFavoriteMovieRepository,
  ) {}
  async save(data: CreateFavoriteMovieDto): Promise<string> {
    try {
      const favoriteMovie = new FavoriteMovieModel();
      const user = new UserModel();
      user._id = data.userId;
      const movie = new MovieModel();
      movie._id = data.movieId;
      favoriteMovie.movie = movie;
      favoriteMovie.user = user;

      return this.favoriteMovieRepository.save(favoriteMovie);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
  async getAll(data: UserDto): Promise<FavoriteMovieDto[]> {
    try {
      const favoriteMovie = new FavoriteMovieModel();
      const user = new UserModel();
      user._id = data._id;
      favoriteMovie.user = user;
      const favoriteMovies = await this.favoriteMovieRepository.getAll(
        favoriteMovie,
      );
      return favoriteMovies.map(
        (favoriteMovies) => new FavoriteMovieDto(favoriteMovies),
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
}
