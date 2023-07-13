import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FavoriteMovieDocument = FavoriteMovie & Document;

@Schema()
export class FavoriteMovie {
  @Prop({ required: true })
  createdAt: string;
}

export const FavoriteMovieSchema = SchemaFactory.createForClass(FavoriteMovie);
