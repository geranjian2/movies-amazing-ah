import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CREATE } from 'src/common/constants';
import { FavoriteMovieDocument, schema } from 'src/common/schemas/mongo';
import { FavoriteMovieModel } from 'src/domain/models';
import { IFavoriteMovieRepository } from 'src/domain/repository';

export class FavoriteMovieImpRepository implements IFavoriteMovieRepository {
  constructor(
    @InjectModel(schema.FAVORITE_MOVIE)
    private favoriteMovieSchema: Model<FavoriteMovieDocument>,
  ) {}
  async save(data: FavoriteMovieModel): Promise<string> {
    await this.favoriteMovieSchema.insertMany(data);
    return CREATE;
  }
  async getAll(data: FavoriteMovieModel): Promise<any[]> {
    return await this.favoriteMovieSchema
      .find(data)
      .populate(['user', 'movie'])
      .exec();
  }
  getById: (dataId: string) => Promise<FavoriteMovieModel>;
  getOne: (filter: FavoriteMovieModel) => Promise<FavoriteMovieModel>;
  delete: (data: FavoriteMovieModel) => Promise<string>;
  update: (data: FavoriteMovieModel) => Promise<FavoriteMovieModel>;
}
