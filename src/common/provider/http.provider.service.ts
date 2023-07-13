import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { OptionsHttp } from '../interface';

@Injectable()
export class HttpProviderService {
  private readonly axiosInstance: AxiosInstance;
  constructor(config: OptionsHttp) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      headers: { ...config.headers },
    });
  }
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(
      url,
      config,
    );
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config,
    );
    return response.data;
  }
}
