import { Controller, Get } from '@nestjs/common';
import { MovieService } from 'src/application/uses-cases';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  async getAll() {
    return await this.movieService.findAll();
  }
}
