import sequelize from '../sequelize/Sequelize';
import { ModelStatic } from 'sequelize';
import { RoleModel } from '../sequelize/models/RoleModel';
import { UserRole } from '../types/UserTypes';

const Model = sequelize.model('Role') as ModelStatic<RoleModel>;

class RoleRepository {
  static async createRole() {
    const role = Model.build({
      id: UserRole.ADMIN,
      name: 'Administrator',
      description: 'The shop admin',
    });
    await role.save();
  }
}

export default RoleRepository;
