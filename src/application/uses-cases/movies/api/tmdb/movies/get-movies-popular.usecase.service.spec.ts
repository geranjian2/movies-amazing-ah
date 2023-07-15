import { Test } from '@nestjs/testing';

import { IMovieExternalRepository } from 'src/domain/repository';
import { IMovieTmdb } from 'src/common/interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MovieIMovieTmdbMock } from 'src/common/mock/movies.mock.const';
import { IMOVIES_EXTERNAL_SHARED } from 'src/common/constants';
import { GetMoviesPopularCaseUse } from './get-movies-popular.usecase.service';

describe('GetMoviesPopularCaseUse', () => {
  let getMoviesPopularCaseUse: GetMoviesPopularCaseUse;
  let movieExternalRepository: IMovieExternalRepository;

  beforeEach(async () => {
    const movieExternalRepositoryMock: Partial<IMovieExternalRepository> = {
      getMoviesPopular: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        GetMoviesPopularCaseUse,
        {
          provide: IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY,
          useValue: movieExternalRepositoryMock,
        },
      ],
    }).compile();

    getMoviesPopularCaseUse = moduleRef.get<GetMoviesPopularCaseUse>(
      GetMoviesPopularCaseUse,
    );
    movieExternalRepository = moduleRef.get<IMovieExternalRepository>(
      IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY,
    );
  });

  describe('run', () => {
    it('should return popular movies', async () => {
      const movies: IMovieTmdb[] = MovieIMovieTmdbMock;
      const getMoviesPopularSpy = jest
        .spyOn(movieExternalRepository, 'getMoviesPopular')
        .mockResolvedValueOnce(movies);

      const result = await getMoviesPopularCaseUse.run();

      expect(getMoviesPopularSpy).toHaveBeenCalled();
      expect(result).toEqual(movies);
    });

    it('should throw HttpException when an error occurs', async () => {
      const getMoviesPopularSpy = jest
        .spyOn(movieExternalRepository, 'getMoviesPopular')
        .mockRejectedValueOnce(
          new HttpException('Custom error', HttpStatus.CONFLICT),
        );

      await expect(getMoviesPopularCaseUse.run()).rejects.toThrowError(
        HttpException,
      );

      expect(getMoviesPopularSpy).toHaveBeenCalled();
    });
  });
});
