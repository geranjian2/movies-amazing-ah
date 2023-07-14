import { Injectable } from '@nestjs/common';
import { MovieModel } from 'src/domain/models';
import { IMovieTmdb } from '../interface';

@Injectable()
export class MovieMapper {
  toTmdbDomain(movieTmdb: IMovieTmdb): MovieModel {
    const movie = new MovieModel();
    movie.movieIMDBid = movieTmdb.id;
    movie.languaje = movieTmdb.original_language;
    movie.originalLanguaje = movieTmdb.original_language;
    movie.title = movieTmdb.title;
    movie.overview = movieTmdb.overview;
    movie.popularity = movieTmdb.popularity.toString();
    movie.genres = movieTmdb.genre_ids.join(',');
    movie.posterPath = movieTmdb.poster_path;
    movie.video = movieTmdb.video;
    movie.realaseDate = movieTmdb.release_date;
    movie.voteAvarage = movieTmdb.vote_average;
    movie.voteAcount = movieTmdb.vote_count;
    return movie;
  }
}
