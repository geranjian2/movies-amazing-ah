import { Controller, Get } from '@nestjs/common';
import { CreateMoviesFromIntegrationTmdbUseCase } from 'src/application/uses-cases';

@Controller('integrations/movies-tmbd')
export class MoviesTmbdController {
  constructor(
    private readonly createMoviesFromIntegrationTmdbUseCase: CreateMoviesFromIntegrationTmdbUseCase,
  ) {}

  @Get()
  async getAll() {
    return await this.createMoviesFromIntegrationTmdbUseCase.run();
  }
}
