import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/domain/models';

@Injectable()
export class UserMapper {
  toDomain(userData: any) {
    const user = new UserModel();
    user._id = userData._id;
    user.email = userData.email;
    user.name = userData.name;
    user.password = userData.password;
    return user;
  }
}
