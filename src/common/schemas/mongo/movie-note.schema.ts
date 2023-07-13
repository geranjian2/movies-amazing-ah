// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MovieNoteDocument = MovieNote & Document;

@Schema()
export class MovieNote {
  @Prop({ required: true })
  noteTitle: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  createdAt: string;
}

export const MovieNoteSchema = SchemaFactory.createForClass(MovieNote);
