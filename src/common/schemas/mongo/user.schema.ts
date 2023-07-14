// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
// import { Role } from './role.schema';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Middleware "pre" para el evento "save"
  async comparePassword(pass: string): Promise<boolean> {
    return await bcrypt.compareSync(pass, this.password);
  }

  //   @Prop({ type: Types.ObjectId, ref: 'Role' })
  //   role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.comparePassword = async function (password: string) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};
