import { Injectable } from '@nestjs/common';
import { FavoriteMovieModel, UserModel } from 'src/domain/models';

@Injectable()
export class FavotireMovieMapper {
  toDomain(userData: any) {
    const favorite = new FavoriteMovieModel();
    favorite.createdAt;
    favorite.movie = userData.movieId;
    favorite.user = userData.userId;
    return favorite;
  }
}
