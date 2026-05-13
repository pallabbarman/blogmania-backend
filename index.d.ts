import { UserRole } from 'generated/prisma/enums';
import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload & { userId?: string; role?: UserRole };
        }
    }
}
