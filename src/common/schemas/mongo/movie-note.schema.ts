// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Movie } from './movie.schema';

export type MovieNoteDocument = MovieNote & Document;

@Schema()
export class MovieNote {
  @Prop({ required: true })
  noteTitle: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Movie' })
  movie: Movie;
}

export const MovieNoteSchema = SchemaFactory.createForClass(MovieNote);
