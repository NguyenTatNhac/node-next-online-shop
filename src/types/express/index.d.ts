import { User } from '../UserTypes';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// to make the file a module and avoid the TypeScript error
export {};
