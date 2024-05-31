import bcrypt from 'bcrypt';
import { User } from '../types/UserTypes';
import UserRepository from '../repositories/UserRepository';
import AlreadyExistsError from '../errors/AlreadyExistsError';
import WrongCredentialsError from '../errors/WrongCredentialsError';
import { JwtPayload } from '../types/JWT';
import JwtService from './JwtService';

type LoginData = {
  email: string;
  password: string;
};

class AuthService {
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

  static async loginUser({ email, password }: LoginData): Promise<string> {
    const user = await UserRepository.findByEmail(email);

    if (user === null) {
      throw new WrongCredentialsError();
    }

    const { id, hashedPassword } = user;
    const passwordMatched = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatched) {
      throw new WrongCredentialsError();
    }
    const payload: JwtPayload = { id, email };
    return JwtService.sign(payload);
  }
}

export default AuthService;
