import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MovieNotesService } from 'src/application/uses-cases/movie-notes/movie-notes.service';
import { Auth, User } from '../../auth/decorators';
import {
  CreateNoteMovieDto,
  UpdatePartialNoteMovieDto,
  UserDto,
} from 'src/domain/dtos';

@Controller('movie-notes')
export class MovieNotesController {
  constructor(private readonly movieNotesService: MovieNotesService) {}

  @Auth()
  @Post()
  async save(@User() user: UserDto, @Body() data: CreateNoteMovieDto) {
    data.userId = user._id;
    return this.movieNotesService.save(data);
  }

  @Auth()
  @Get()
  async getAll(@User() user: UserDto) {
    return this.movieNotesService.getAll(user);
  }
  @Auth()
  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body() data: UpdatePartialNoteMovieDto,
  ) {
    data._id = id;
    return this.movieNotesService.partialUpdate(data);
  }
}
