import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/domain/models';

export class UserDto {
  constructor(register: UserModel) {
    this.name = register.name;
    this.email = register.email;
    this._id = register._id;
    // this.password = register.password;
  }
  @ApiProperty()
  _id;
  @ApiProperty()
  name;
  @ApiProperty()
  email;
  // @ApiProperty()
  // password;
}
