import { FavoriteMovieModel, UserModel } from 'src/domain/models';
import { FavoriteMovieMapper } from './favorite-movie.mapper';

describe('FavoriteMovieMapper', () => {
  let favoriteMovieMapper: FavoriteMovieMapper;

  beforeEach(() => {
    favoriteMovieMapper = new FavoriteMovieMapper();
  });

  describe('toDomain', () => {
    fit('should map user data to a FavoriteMovieModel object', () => {
      // Arrange
      const userData = {
        movieId: '123',
        userId: '456',
      };

      // Act
      const result = favoriteMovieMapper.toDomain(userData);

      // Assert
      expect(result).toBeInstanceOf(FavoriteMovieModel);
      expect(result.movie).toBe(userData.movieId);
      expect(result.user).toBe(userData.userId);
    });
  });
});
