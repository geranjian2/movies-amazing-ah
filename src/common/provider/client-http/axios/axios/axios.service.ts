import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IHttp, IHttpParams } from 'src/common/interface';

export class AxiosService implements IHttp<IHttpParams> {
  constructor(private httpService: HttpService) {}
  async get(httpOptions: IHttpParams): Promise<any> {
    const response = await this.httpService.axiosRef.get(httpOptions.uri, {
      headers: { ...httpOptions.headers },
    });
    return response;
  }
  async post(httpOptions: IHttpParams): Promise<any> {
    // const text = process.env.VERIFICATION_MSG.replace('code', data.code)
    let result;
    await this.httpService.axiosRef
      .post(httpOptions.uri, httpOptions.data, {
        headers: { ...httpOptions.headers },
      })
      .then((response) => {
        result = {
          error: 0,
          message: 'OK',
          data: response.data,
          statusCode: response.status,
        };
      })
      .catch((error) => {
        result = {
          error: 1,
          message:
            error.response.data.errors?.detail ??
            error.response.data?.message ??
            error.response.data.errors,
          statusCode: error.response.status,
        };
      });
    return result;
  }
}
