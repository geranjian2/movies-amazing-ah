import { AuthRegisterUseCase } from './auth/auth-register.usecase.service';
import { AuthService } from './auth/auth.service';
import { CreateMoviesFromIntegrationTmdbUseCase } from './movies/create-movies-from-integration-tmdb.usecase.service';
import { MovieService } from './movies/movie.service';

export const CASE_USES = [
  CreateMoviesFromIntegrationTmdbUseCase,
  MovieService,
  AuthRegisterUseCase,
  AuthService,
];
