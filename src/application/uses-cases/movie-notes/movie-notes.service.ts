import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { INOTES_MOVIE_SHARED, NOT_FOUND } from 'src/common/constants';
import {
  CreateNoteMovieDto,
  MovieNoteDto,
  UpdatePartialNoteMovieDto,
  UserDto,
} from 'src/domain/dtos';
import { MovieModel, MovieNoteModel, UserModel } from 'src/domain/models';
import { IMovieNoteRepository } from 'src/domain/repository';

@Injectable()
export class MovieNotesService {
  constructor(
    @Inject(INOTES_MOVIE_SHARED.IMOVIENOTEREPOSITORY)
    private movieNoteRepository: IMovieNoteRepository,
  ) {}
  async save(data: CreateNoteMovieDto): Promise<string> {
    try {
      const movieNote = new MovieNoteModel();
      const user = new UserModel();
      user._id = data.userId;
      const movie = new MovieModel();
      movie._id = data.movieId;
      movieNote.movie = movie;
      movieNote.user = user;
      return await this.movieNoteRepository.save({ ...data, ...movieNote });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
  async getAll(data: UserDto): Promise<MovieNoteDto[]> {
    try {
      const movieNote = new MovieNoteModel();
      const user = new UserModel();
      user._id = data._id;
      movieNote.user = user;
      const movieNotes = await this.movieNoteRepository.getAll(movieNote);
      return movieNotes.map((movieNote) => new MovieNoteDto(movieNote));
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
  async partialUpdate(data: UpdatePartialNoteMovieDto): Promise<string> {
    try {
      const movieNote = await this.movieNoteRepository.getById(data._id);
      if (!movieNote) throw new BadRequestException(NOT_FOUND);
      movieNote.noteTitle = data.noteTitle;
      return await this.movieNoteRepository.update(movieNote);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
}
