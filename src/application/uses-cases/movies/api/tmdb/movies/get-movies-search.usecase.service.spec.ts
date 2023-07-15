import { Test } from '@nestjs/testing';
import { IMovieExternalRepository } from 'src/domain/repository';
import { IMovieTmdb } from 'src/common/interface';
import { GetParamMovieSearchDto } from 'src/common/standar-dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MovieIMovieTmdbMock } from 'src/common/mock/movies.mock.const';
import { GetMoviesSearchCaseUse } from './get-movies-search.usecase.service';
import { IMOVIES_EXTERNAL_SHARED } from 'src/common/constants';

describe('GetMoviesSearchCaseUse', () => {
  let getMoviesSearchCaseUse: GetMoviesSearchCaseUse;
  let movieExternalRepository: IMovieExternalRepository;

  beforeEach(async () => {
    const movieExternalRepositoryMock: Partial<IMovieExternalRepository> = {
      getMoviesSearch: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        GetMoviesSearchCaseUse,
        {
          provide: IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY,
          useValue: movieExternalRepositoryMock,
        },
      ],
    }).compile();

    getMoviesSearchCaseUse = moduleRef.get<GetMoviesSearchCaseUse>(
      GetMoviesSearchCaseUse,
    );
    movieExternalRepository = moduleRef.get<IMovieExternalRepository>(
      IMOVIES_EXTERNAL_SHARED.IMOVIEEXTERNALREPOSITORY,
    );
  });

  describe('run', () => {
    it('should return search results', async () => {
      const searchDto: GetParamMovieSearchDto = {
        q: 'action',
      };
      const movies: IMovieTmdb[] = MovieIMovieTmdbMock;
      const getMoviesSearchSpy = jest
        .spyOn(movieExternalRepository, 'getMoviesSearch')
        .mockResolvedValueOnce(movies);

      const result = await getMoviesSearchCaseUse.run(searchDto);

      expect(getMoviesSearchSpy).toHaveBeenCalledWith(searchDto);
      expect(result).toEqual(movies);
    });

    it('should throw HttpException when an error occurs', async () => {
      const searchDto: GetParamMovieSearchDto = {
        q: 'action',
      };
      const getMoviesSearchSpy = jest
        .spyOn(movieExternalRepository, 'getMoviesSearch')
        .mockRejectedValueOnce(
          new HttpException('Custom error', HttpStatus.CONFLICT),
        );

      await expect(getMoviesSearchCaseUse.run(searchDto)).rejects.toThrowError(
        HttpException,
      );

      expect(getMoviesSearchSpy).toHaveBeenCalledWith(searchDto);
    });
  });
});
