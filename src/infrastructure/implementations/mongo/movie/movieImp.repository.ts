import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CREATE_BULK } from 'src/common/constants';
import { MovieDocument, schema } from 'src/common/schemas/mongo';
import { MovieModel } from 'src/domain/models';
import { IMovieRepository } from 'src/domain/repository';

export class MovieImpRepository implements IMovieRepository {
  constructor(
    @InjectModel(schema.MOVIE) private movieSchema: Model<MovieDocument>,
  ) {}
  save: (data: any) => Promise<string>;
  async getAll(): Promise<any[]> {
    return this.movieSchema.find().exec();
  }
  getById: (dataId: string) => Promise<any>;
  getOne: (filter: any) => Promise<any>;
  delete: (data: any) => Promise<string>;
  update: (data: any) => Promise<any>;
  async saveBulk(data: MovieModel[]): Promise<string> {
    await this.movieSchema.insertMany(data);
    return CREATE_BULK;
  }
}
