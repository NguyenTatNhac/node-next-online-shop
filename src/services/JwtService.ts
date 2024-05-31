import { JwtPayload } from '../types/JWT';
import jwt from 'jsonwebtoken';

class JwtService {
  private static JWT_SECRET = process.env.JWT_SECRET_KEY as string;
  private static JWT_EXPIRES_IN = '30d';

  static {
    if (!JwtService.JWT_SECRET) {
      throw new Error(
        'JWT_SECRET_KEY is not defined in environment variables.',
      );
    }
  }

  static sign(payload: JwtPayload): string {
    return jwt.sign(payload, JwtService.JWT_SECRET, {
      expiresIn: JwtService.JWT_EXPIRES_IN,
    });
  }

  static verify(token: string): JwtPayload {
    return jwt.verify(token, JwtService.JWT_SECRET) as JwtPayload;
  }
}

export default JwtService;
