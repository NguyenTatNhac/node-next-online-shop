import UserRepository from '../repositories/UserRepository';

class UserService {
  static async getById(id: number) {
    return UserRepository.findById(id);
  }
}

export default UserService;
