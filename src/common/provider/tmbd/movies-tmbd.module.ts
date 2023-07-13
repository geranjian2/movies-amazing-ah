import { Module } from '@nestjs/common';
import { MoviesTmbdProviderService } from './movies-tmbd.service';
import { HttpProviderService } from '../http.provider.service';
import { ConfigService } from '@nestjs/config';
import { TMDB_ACCESS_TOKEN, URI_MOVIESTMDB } from 'src/common/constants';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      useFactory: (config: ConfigService) => {
        return new HttpProviderService({
          baseURL: config.get<string>(URI_MOVIESTMDB),
          headers: {
            Authorization: `Bearer ${config.get<string>(TMDB_ACCESS_TOKEN)}`,
          },
        });
      },
      provide: HttpProviderService,
      inject: [ConfigService],
    },
    MoviesTmbdProviderService,
  ],
  exports: [MoviesTmbdProviderService],
})
export class MoviesTmbdModule {}
