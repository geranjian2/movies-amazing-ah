import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Movie } from './movie.schema';

export type FavoriteMovieDocument = FavoriteMovie & Document;

@Schema()
export class FavoriteMovie {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Movie' })
  movie: Movie;
}

export const FavoriteMovieSchema = SchemaFactory.createForClass(FavoriteMovie);
