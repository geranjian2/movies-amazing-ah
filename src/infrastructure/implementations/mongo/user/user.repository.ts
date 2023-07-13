import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResultITmdb } from 'src/common/interface';
import { MoviesTmbdProviderService } from 'src/common/provider';
import { User, UserDocument } from 'src/common/schemas/mongo';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly moviesTmbdProviderService: MoviesTmbdProviderService,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }
  async getMovies(): Promise<IResultITmdb> {
    const movies = await this.moviesTmbdProviderService.getMoviePopular();
    console.log(`🚀 ------>>> movies`, movies);
    movies.results.map((movie) => {
      console.log(`🚀 ------>>> movie`, movie.id);
    });
    return movies;
  }
}
