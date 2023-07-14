export interface IBaseRepository<T> {
  save: (data: T | T[]) => Promise<string>;
  getAll: () => Promise<T[]>;
  getById: (dataId: string) => Promise<T | undefined>;
  getOne: (filter: T) => Promise<T | undefined>;
  delete: (data: T) => Promise<string>;
  update: (data: T) => Promise<T>;
}
