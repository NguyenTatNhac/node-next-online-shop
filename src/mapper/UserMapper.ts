import { UserModel } from '../sequelize/models/UserModel';
import { User } from '../types/UserTypes';

class UserMapper {
  // Finding a good mapper lib
  static fromModelToDto(model: UserModel): User {
    const { id, email, firstName, lastName } = model;
    return { id, email, firstName, lastName };
  }
}

export default UserMapper;
