import UserRepository from '../repositories/UserRepository';

class UserService {
  static async getById(id: number) {
    return UserRepository.findById(id);
  }

  static getByIdWithRoles(id: number) {
    return UserRepository.findByIdWithRoles(id);
  }
}

export default UserService;
