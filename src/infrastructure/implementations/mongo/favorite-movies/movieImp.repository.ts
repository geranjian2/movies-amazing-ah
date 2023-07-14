import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CREATE_BULK } from 'src/common/constants';
import { MovieDocument, schema } from 'src/common/schemas/mongo';
import { MovieModel } from 'src/domain/models';
import { IFavoriteMovieRepository } from 'src/domain/repository';

export class FavoriteMovieImpRepository implements IFavoriteMovieRepository {
  constructor(
    @InjectModel(schema.MOVIE) private movieSchema: Model<MovieDocument>,
  ) {}
  save: (data: MovieModel | MovieModel[]) => Promise<string>;
  getAll: () => Promise<MovieModel[]>;
  getById: (dataId: string) => Promise<MovieModel>;
  getOne: (filter: MovieModel) => Promise<MovieModel>;
  delete: (data: MovieModel) => Promise<string>;
  update: (data: MovieModel) => Promise<MovieModel>;
}
