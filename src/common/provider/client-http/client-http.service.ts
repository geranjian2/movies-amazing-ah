import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { IHttp, IHttpParams } from './interfaces/IHttp';
import { AxiosService } from './axios/axios/axios.service';

@Injectable()
export class ClientHttpService implements IHttp<IHttpParams> {
  axiosService: AxiosService;
  logger = new Logger('Bootstrap');
  constructor(private httpService: HttpService) {
    this.axiosService = new AxiosService(httpService);
  }
  async get(httpOptions: IHttpParams): Promise<any | undefined | null> {
    return await this.axiosService.get(httpOptions);
  }
  async post(httpOptions: IHttpParams): Promise<any | undefined | null> {
    // console.log(httpOptions)
    return await this.axiosService.post(httpOptions);
  }
}
