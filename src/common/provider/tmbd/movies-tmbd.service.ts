import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpProviderService } from '../http.provider.service';
import { ConfigService } from '@nestjs/config';
import {
  TMDB_ACCESS_TOKEN,
  TMDB_API_KEY,
} from 'src/common/constants/global.constants';
import { IResultITmdb } from 'src/common/interface';

@Injectable()
export class MoviesTmbdProviderService {
  private readonly apiKey: string;
  private readonly accessToken: string;
  constructor(
    private readonly httpProviderService: HttpProviderService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>(TMDB_API_KEY);
    this.accessToken = this.configService.get<string>(TMDB_ACCESS_TOKEN);
  }

  async getMoviePopular(): Promise<IResultITmdb> {
    const url = `/movie/popular?language=en-US&page=1?api_key=${this.apiKey}`;
    return this.httpProviderService.get<IResultITmdb>(url);
  }
}
