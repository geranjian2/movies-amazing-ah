import { Test } from '@nestjs/testing';
import { MovieNotesService } from './movie-notes.service';
import { IMovieNoteRepository } from 'src/domain/repository';
import {
  CreateNoteMovieDto,
  MovieNoteDto,
  UpdatePartialNoteMovieDto,
  UserDto,
} from 'src/domain/dtos';
import { MovieNoteModel, MovieModel, UserModel } from 'src/domain/models';
import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CREATE, INOTES_MOVIE_SHARED, UPDATE } from 'src/common/constants';

describe('MovieNotesService', () => {
  let movieNotesService: MovieNotesService;
  let movieNoteRepository: IMovieNoteRepository;
  const userDto: UserDto = {
    _id: 'userId',
    name: 'dummy',
    email: 'dummy@mail.com',
  };
  beforeEach(async () => {
    const movieNoteRepositoryMock: Partial<IMovieNoteRepository> = {
      save: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        MovieNotesService,
        {
          provide: INOTES_MOVIE_SHARED.IMOVIENOTEREPOSITORY,
          useValue: movieNoteRepositoryMock,
        },
      ],
    }).compile();

    movieNotesService = moduleRef.get<MovieNotesService>(MovieNotesService);
    movieNoteRepository = moduleRef.get<IMovieNoteRepository>(
      INOTES_MOVIE_SHARED.IMOVIENOTEREPOSITORY,
    );
  });

  describe('save', () => {
    it('should save a movie note and return the ID', async () => {
      const noteId = 'noteId';
      const saveSpy = jest
        .spyOn(movieNoteRepository, 'save')
        .mockResolvedValueOnce(CREATE);

      const createNoteMovieDto: CreateNoteMovieDto = {
        userId: 'userId',
        movieId: 'movieId',
        noteTitle: 'Note Title',
        description: 'Note Content',
      };

      const result = await movieNotesService.save(createNoteMovieDto);

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(result).toBe(CREATE);
    });

    it('should throw HttpException when an error occurs', async () => {
      const saveSpy = jest
        .spyOn(movieNoteRepository, 'save')
        .mockRejectedValueOnce(new Error('Custom error'));

      const createNoteMovieDto: CreateNoteMovieDto = {
        userId: 'userId',
        movieId: 'movieId',
        noteTitle: 'Note Title',
        description: 'Note Content',
      };

      await expect(
        movieNotesService.save(createNoteMovieDto),
      ).rejects.toThrowError(HttpException);

      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAll', () => {
    it('should return an array of MovieNoteDto', async () => {
      const movieNotes = [
        { _id: '1', movie: {}, user: {} },
      ] as MovieNoteModel[];
      const getAllSpy = jest
        .spyOn(movieNoteRepository, 'getAll')
        .mockResolvedValueOnce(movieNotes);

      const result = await movieNotesService.getAll(userDto);

      expect(getAllSpy).toHaveBeenCalledTimes(1);
      expect(getAllSpy).toHaveBeenCalledWith({ user: { _id: 'userId' } });
      expect(result).toEqual(
        movieNotes.map((movieNote) => new MovieNoteDto(movieNote)),
      );
    });

    it('should throw HttpException when an error occurs', async () => {
      const getAllSpy = jest
        .spyOn(movieNoteRepository, 'getAll')
        .mockRejectedValueOnce(new Error('Custom error'));

      await expect(movieNotesService.getAll(userDto)).rejects.toThrowError(
        HttpException,
      );
      expect(getAllSpy).toHaveBeenCalledTimes(1);
      expect(getAllSpy).toHaveBeenCalledWith(expect.any(MovieNoteModel));
    });
  });

  describe('partialUpdate', () => {
    it('should update a movie note and return the ID', async () => {
      const noteId = 'noteId';
      const movieNote: MovieNoteModel = {
        _id: noteId,
        noteTitle: 'Old Note Title',
        description: 'Old Note Content',
        movie: {} as MovieModel,
        user: {} as UserModel,
      };
      const getByIdSpy = jest
        .spyOn(movieNoteRepository, 'getById')
        .mockResolvedValueOnce(movieNote);
      const updateSpy = jest
        .spyOn(movieNoteRepository, 'update')
        .mockResolvedValueOnce(UPDATE);

      const updatePartialNoteMovieDto: UpdatePartialNoteMovieDto = {
        _id: noteId,
        noteTitle: 'Updated Note Title',
      };

      const result = await movieNotesService.partialUpdate(
        updatePartialNoteMovieDto,
      );
      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(noteId);
      expect(updateSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          ...updatePartialNoteMovieDto,
        }),
      );
      expect(result).toBe(UPDATE);
    });

    it('should throw BadRequestException when the movie note is not found', async () => {
      const noteId = 'noteId';
      const getByIdSpy = jest
        .spyOn(movieNoteRepository, 'getById')
        .mockResolvedValueOnce(null);

      const updatePartialNoteMovieDto: UpdatePartialNoteMovieDto = {
        _id: noteId,
        noteTitle: 'Updated Note Title',
      };

      await expect(
        movieNotesService.partialUpdate(updatePartialNoteMovieDto),
      ).rejects.toThrowError(HttpException);

      expect(getByIdSpy).toHaveBeenCalledWith(noteId);
    });

    it('should throw HttpException when an error occurs', async () => {
      const noteId = 'noteId';
      const getByIdSpy = jest
        .spyOn(movieNoteRepository, 'getById')
        .mockRejectedValueOnce(new Error('Custom error'));

      const updatePartialNoteMovieDto: UpdatePartialNoteMovieDto = {
        _id: noteId,
        noteTitle: 'Updated Note Title',
      };

      await expect(
        movieNotesService.partialUpdate(updatePartialNoteMovieDto),
      ).rejects.toThrowError(HttpException);

      expect(getByIdSpy).toHaveBeenCalledWith(noteId);
    });
  });
});
