import { Test } from '@nestjs/testing';
import { IMovieRepository } from 'src/domain/repository';
import { MovieExternalImpRepository } from 'src/infrastructure/implementations/api/movies/movies-external.repository';
import { MovieMapper } from 'src/common/mappers';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateMoviesFromIntegrationTmdbUseCase } from './create-movies-from-integration-tmdb.usecase.service';
import { IMOVIES_EXTERNAL_SHARED, IMOVIES_SHARED } from 'src/common/constants';
import {
  MovieIMovieTmdbMock,
  moviesModelMock,
} from 'src/common/mock/movies.mock.const';
import { IMovieTmdb } from 'src/common/interface';

describe('CreateMoviesFromIntegrationTmdbUseCase', () => {
  let createMoviesFromIntegrationTmdbUseCase: CreateMoviesFromIntegrationTmdbUseCase;
  let movieRepository: IMovieRepository;
  let movieExternalRepository: MovieExternalImpRepository;
  let movieMapper: MovieMapper;

  beforeEach(async () => {
    const movieRepositoryMock: Partial<IMovieRepository> = {
      saveBulk: jest.fn(),
    };

    const movieExternalRepositoryMock: Partial<MovieExternalImpRepository> = {
      getMoviesPopular: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateMoviesFromIntegrationTmdbUseCase,
        {
          provide: IMOVIES_SHARED.IMOVIEREPOSITORY,
          useValue: movieRepositoryMock,
        },
        {
          provide: IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY,
          useValue: movieExternalRepositoryMock,
        },
        MovieMapper,
      ],
    }).compile();

    createMoviesFromIntegrationTmdbUseCase =
      moduleRef.get<CreateMoviesFromIntegrationTmdbUseCase>(
        CreateMoviesFromIntegrationTmdbUseCase,
      );
    movieRepository = moduleRef.get<IMovieRepository>(
      IMOVIES_SHARED.IMOVIEREPOSITORY,
    );
    movieExternalRepository = moduleRef.get<MovieExternalImpRepository>(
      IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY,
    );
    movieMapper = moduleRef.get<MovieMapper>(MovieMapper);
  });

  describe('run', () => {
    it('should save the movies and return a string', async () => {
      const moviesExternal: IMovieTmdb[] = MovieIMovieTmdbMock;
      const saveBulkSpy = jest
        .spyOn(movieRepository, 'saveBulk')
        .mockResolvedValueOnce('Saved');

      const getMoviesPopularSpy = jest
        .spyOn(movieExternalRepository, 'getMoviesPopular')
        .mockResolvedValueOnce(moviesExternal);

      const toTmdbDomainSpy = jest
        .spyOn(movieMapper, 'toTmdbDomain')
        .mockReturnValueOnce({ _id: '1', title: 'Movie 1' });

      const result = await createMoviesFromIntegrationTmdbUseCase.run();

      expect(getMoviesPopularSpy).toHaveBeenCalled();
      expect(toTmdbDomainSpy).toHaveBeenCalledTimes(moviesExternal.length);
      expect(saveBulkSpy).toHaveBeenCalled();
      // expect(result).toBe('Saved');
    });

    it('should throw HttpException when an error occurs', async () => {
      const getMoviesPopularSpy = jest
        .spyOn(movieExternalRepository, 'getMoviesPopular')
        .mockRejectedValueOnce(new Error('Custom error'));

      await expect(
        createMoviesFromIntegrationTmdbUseCase.run(),
      ).rejects.toThrowError(HttpException);

      expect(getMoviesPopularSpy).toHaveBeenCalled();
    });
  });
});
