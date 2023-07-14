import { Inject, Injectable } from '@nestjs/common';
import { IMOVIES_SHARED } from 'src/common/constants';
import { MovieDto } from 'src/domain/dtos';
import { IMovieRepository } from 'src/domain/repository';

@Injectable()
export class MovieService {
  constructor(
    @Inject(IMOVIES_SHARED.IMOVIEREPOSITORY)
    private movieRepository: IMovieRepository,
  ) {}
  async findAll(): Promise<MovieDto[]> {
    const movies = await this.movieRepository.getAll();
    return movies.map((movie) => new MovieDto(movie));
  }
}
