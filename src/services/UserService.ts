import bcrypt from 'bcrypt';
import { User } from '../types/UserTypes';
import UserRepository from '../repositories/UserRepository';
import AlreadyExistsError from '../errors/AlreadyExistsError';

class UserService {
  static async registerUser(user: User): Promise<User> {
    const { email } = user;
    // Cast the password to string, since we validated in the controller
    const password = user.password as string;

    // Check if the user with the same email already exists
    const userWithSameEmail = await UserRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new AlreadyExistsError(
        `The user with email [${email}] is already exist`,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return UserRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}

export default UserService;
