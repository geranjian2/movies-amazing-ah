import { IHeaders } from './IHeaders';

export interface IHttp<T> {
  post: (options: T) => Promise<any | undefined | null>;
  get: (options: T) => Promise<any | undefined | null>;
}

export interface IHttpParams {
  headers: IHeaders;
  uri: string;
  data?: any;
}
