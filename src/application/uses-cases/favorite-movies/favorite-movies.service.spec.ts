import { Test } from '@nestjs/testing';
import { FavoriteMoviesService } from './favorite-movies.service';
import { IFavoriteMovieRepository } from 'src/domain/repository';
import {
  CreateFavoriteMovieDto,
  FavoriteMovieDto,
  UserDto,
} from 'src/domain/dtos';
import { FavoriteMovieModel, MovieModel, UserModel } from 'src/domain/models';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IFAVORITE_MOVIE_SHARED } from 'src/common/constants';

describe('FavoriteMoviesService', () => {
  let favoriteMoviesService: FavoriteMoviesService;
  let favoriteMovieRepository: IFavoriteMovieRepository;

  beforeEach(async () => {
    const favoriteMovieRepositoryMock: Partial<IFavoriteMovieRepository> = {
      save: jest.fn(),
      getAll: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        FavoriteMoviesService,
        {
          provide: IFAVORITE_MOVIE_SHARED.IFAVORITEMOVIEREPOSITORY,
          useValue: favoriteMovieRepositoryMock,
        },
      ],
    }).compile();

    favoriteMoviesService = moduleRef.get<FavoriteMoviesService>(
      FavoriteMoviesService,
    );
    favoriteMovieRepository = moduleRef.get<IFavoriteMovieRepository>(
      IFAVORITE_MOVIE_SHARED.IFAVORITEMOVIEREPOSITORY,
    );
  });

  describe('save', () => {
    it('should save a favorite movie and return the ID', async () => {
      const favoriteMovieId = 'favoriteMovieId';
      const saveSpy = jest
        .spyOn(favoriteMovieRepository, 'save')
        .mockResolvedValueOnce(favoriteMovieId);

      const createFavoriteMovieDto: CreateFavoriteMovieDto = {
        userId: 'userId',
        movieId: 'movieId',
      };

      const result = await favoriteMoviesService.save(createFavoriteMovieDto);

      expect(saveSpy).toHaveBeenCalledWith(expect.any(FavoriteMovieModel));
      expect(result).toBe(favoriteMovieId);
    });

    it('should throw HttpException when an error occurs', async () => {
      //TODO:verificar por que no entra al exception
      const saveSpy = jest
        .spyOn(favoriteMovieRepository, 'save')
        .mockRejectedValueOnce(
          new HttpException('Custom error', HttpStatus.CONFLICT),
        );

      const createFavoriteMovieDto: CreateFavoriteMovieDto = {
        userId: 'userId',
        movieId: 'movieId',
      };

      await expect(
        favoriteMoviesService.save(createFavoriteMovieDto),
      ).rejects.toThrowError(HttpException);

      // expect(favoriteMoviesService).toHaveBeenCalledWith(
      //   expect.any(createFavoriteMovieDto),
      // );
    });
  });

  describe('getAll', () => {
    it('should return an array of FavoriteMovieDto', async () => {
      const favoriteMovies = [
        { _id: '1', movie: {}, user: {} },
      ] as FavoriteMovieModel[];
      const getAllSpy = jest
        .spyOn(favoriteMovieRepository, 'getAll')
        .mockResolvedValueOnce(favoriteMovies);

      const userDto: UserDto = { _id: 'userId', name: '', email: '' };

      const result = await favoriteMoviesService.getAll(userDto);

      expect(getAllSpy).toHaveBeenCalledWith(expect.any(FavoriteMovieModel));
      expect(result).toEqual(
        favoriteMovies.map(
          (favoriteMovie) => new FavoriteMovieDto(favoriteMovie),
        ),
      );
    });

    it('should throw HttpException when an error occurs', async () => {
      const getAllSpy = jest
        .spyOn(favoriteMovieRepository, 'getAll')
        .mockRejectedValueOnce(() => {
          throw new HttpException('error_dummy', HttpStatus.CONFLICT);
        });

      const userDto: UserDto = { _id: 'userId', name: '', email: '' };

      await expect(favoriteMoviesService.getAll(userDto)).rejects.toThrowError(
        HttpException,
      );

      expect(getAllSpy).toHaveBeenCalledWith(expect.any(FavoriteMovieModel));
    });
  });
});
