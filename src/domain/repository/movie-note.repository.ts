import { MovieNoteModel } from '../models';
import { IBaseRepository } from './base.repository';

export class IMovieNoteRepository implements IBaseRepository<MovieNoteModel> {
  save: (data: MovieNoteModel) => Promise<string>;
  getAll: (data: MovieNoteModel) => Promise<MovieNoteModel[]>;
  getById: (dataId: string) => Promise<MovieNoteModel>;
  getOne: (filter: MovieNoteModel) => Promise<MovieNoteModel>;
  delete: (data: MovieNoteModel) => Promise<string>;
  update: (data: MovieNoteModel) => Promise<string>;
}
