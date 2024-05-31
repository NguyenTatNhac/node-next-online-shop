import RoleRepository from '../repositories/RoleRepository';
import { Request, Response } from 'express';

class RoleController {
  static async createRole(_req: Request, res: Response) {
    await RoleRepository.createRole();
    res.json({ ok: 'OK' });
  }
}

export default RoleController;
