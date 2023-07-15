import { Controller, Get, Query } from '@nestjs/common';
import {
  CreateMoviesFromIntegrationTmdbUseCase,
  GetMoviesPopularCaseUse,
  GetMoviesSearchCaseUse,
} from 'src/application/uses-cases';
import { Auth } from '../../auth/decorators';
import { GetParamMovieSearchDto } from 'src/common/standar-dto';

@Controller('integrations/movies-tmbd')
export class MoviesTmbdController {
  constructor(
    private readonly createMoviesFromIntegrationTmdbUseCase: CreateMoviesFromIntegrationTmdbUseCase,
    private readonly getMoviesPopularCaseUse: GetMoviesPopularCaseUse,
    private readonly getMoviesSearchCaseUse: GetMoviesSearchCaseUse,
  ) {}
  @Auth()
  @Get()
  async getAll() {
    return await this.createMoviesFromIntegrationTmdbUseCase.run();
  }
  @Auth()
  @Get('popular')
  async getPopular() {
    return await this.getMoviesPopularCaseUse.run();
  }
  @Auth()
  @Get('search')
  async getSearch(@Query() data: GetParamMovieSearchDto) {
    return await this.getMoviesSearchCaseUse.run(data);
  }
}
