import express from 'express';
import RoleController from '../controllers/RoleController';

const rolesRouter = express.Router();

rolesRouter.post('/', RoleController.createRole);

export default rolesRouter;
