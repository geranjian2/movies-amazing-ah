import { Module } from '@nestjs/common';
import { MoviesTmbdController } from './movies/movies-tmbd.controller';
import { CASE_USES, GetMoviesPopularCaseUse } from 'src/application/uses-cases';
import { MovieMapper } from 'src/common/mappers';
import { MongoModule } from 'src/infrastructure/implementations/mongo/mongo.module';
import { ApiModule } from 'src/infrastructure/implementations/api/api.module';

@Module({
  imports: [ApiModule, MongoModule],
  controllers: [MoviesTmbdController],
  providers: [MovieMapper, ...CASE_USES, GetMoviesPopularCaseUse],
})
export class HttpIntegrationsModule {}
