import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  movieApiId: string;

  @Prop({ required: true })
  movieIMDBid: string;

  @Prop({ required: true })
  languaje: string;

  @Prop({ required: true })
  genres: string;

  @Prop({ required: true })
  originalLanguaje: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  overview: string;

  @Prop({ required: true })
  popularity: string;

  @Prop({ required: true })
  posterPath: string;

  @Prop({ required: true })
  realaseDate: string;

  @Prop({ required: true })
  video: string;

  @Prop({ required: true })
  voteAvarage: string;

  @Prop({ required: true })
  voteAcount: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
