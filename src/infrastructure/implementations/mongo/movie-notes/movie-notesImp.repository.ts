import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CREATE, UPDATE } from 'src/common/constants';
import { MovieNoteDocument, schema } from 'src/common/schemas/mongo';
import { MovieNoteModel } from 'src/domain/models';
import { IMovieNoteRepository } from 'src/domain/repository';

export class MovieNoteImpRepository implements IMovieNoteRepository {
  constructor(
    @InjectModel(schema.MOVIE_NOTE)
    private movieNoteModel: Model<MovieNoteDocument>,
  ) {}
  async save(data: MovieNoteModel): Promise<string> {
    await this.movieNoteModel.insertMany(data);
    return CREATE;
  }
  async getAll(data: MovieNoteModel): Promise<any[]> {
    return await this.movieNoteModel
      .find(data)
      .populate(['user', 'movie'])
      .exec();
  }
  async getById(dataId: string): Promise<MovieNoteModel> {
    return await this.movieNoteModel.findById(dataId);
  }
  getOne: (filter: MovieNoteModel) => Promise<MovieNoteModel>;
  delete: (data: MovieNoteModel) => Promise<string>;
  async update(data: Partial<MovieNoteModel>): Promise<string> {
    const { _id, ...dataMovieNote } = data;
    await this.movieNoteModel.findByIdAndUpdate(_id, dataMovieNote);
    return UPDATE;
  }
}
