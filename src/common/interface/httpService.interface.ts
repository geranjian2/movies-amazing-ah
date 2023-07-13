export interface OptionsHttp {
  baseURL: string;
  headers?: Headers;
}

export interface Headers {
  Authorization: string;
  accept?: string;
}
