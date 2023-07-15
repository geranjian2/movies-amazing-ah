import { Body, Controller, Get, Post } from '@nestjs/common';
import { FavoriteMoviesService } from 'src/application/uses-cases/favorite-movies/favorite-movies.service';
import { CreateFavoriteMovieDto, UserDto } from 'src/domain/dtos';
import { Auth, User } from '../../auth/decorators';

@Controller('favorite-movies')
export class FavoriteMoviesController {
  constructor(private readonly favoriteMoviesService: FavoriteMoviesService) {}
  @Auth()
  @Post()
  async save(@User() user: UserDto, @Body() data: CreateFavoriteMovieDto) {
    data.userId = user._id;
    return await this.favoriteMoviesService.save(data);
  }
  @Auth()
  @Get()
  async getAll(@User() user: UserDto) {
    return await this.favoriteMoviesService.getAll(user);
  }
}
