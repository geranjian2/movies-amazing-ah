import { Test } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { IMovieRepository } from 'src/domain/repository';
import { MovieDto } from 'src/domain/dtos';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IMOVIES_SHARED } from 'src/common/constants';

describe('MovieService', () => {
  let movieService: MovieService;
  let movieRepository: IMovieRepository;

  beforeEach(async () => {
    const movieRepositoryMock: Partial<IMovieRepository> = {
      getAll: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: IMOVIES_SHARED.IMOVIEREPOSITORY,
          useValue: movieRepositoryMock,
        },
      ],
    }).compile();

    movieService = moduleRef.get<MovieService>(MovieService);
    movieRepository = moduleRef.get<IMovieRepository>(
      IMOVIES_SHARED.IMOVIEREPOSITORY,
    );
  });

  describe('findAll', () => {
    it('should return an array of MovieDto', async () => {
      const movies = [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ];
      const getAllSpy = jest
        .spyOn(movieRepository, 'getAll')
        .mockResolvedValueOnce(movies);

      const result = await movieService.findAll();

      expect(getAllSpy).toHaveBeenCalledWith({});
      expect(result).toEqual(movies.map((movie) => new MovieDto(movie)));
    });

    it('should throw HttpException when an error occurs', async () => {
      const getAllSpy = jest
        .spyOn(movieRepository, 'getAll')
        .mockRejectedValueOnce(
          new HttpException('Custom error', HttpStatus.CONFLICT),
        );

      await expect(movieService.findAll()).rejects.toThrowError(HttpException);

      expect(getAllSpy).toHaveBeenCalledWith({});
    });
  });
});
