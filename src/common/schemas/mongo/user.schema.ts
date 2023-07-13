// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// import { Role } from './role.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  //   @Prop({ type: Types.ObjectId, ref: 'Role' })
  //   role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
