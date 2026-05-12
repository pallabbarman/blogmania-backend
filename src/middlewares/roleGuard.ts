import HttpError from 'errors/httpError';
import { NextFunction, Request, Response } from 'express';
import { UserRole } from 'generated/prisma/enums';
import status from 'http-status';

const roleGuard =
    (...allowedRoles: UserRole[]) =>
    (req: Request, _res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new HttpError(status.UNAUTHORIZED, 'Unauthorized'));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new HttpError(status.FORBIDDEN, 'Forbidden: insufficient permissions'));
        }

        next();
    };

export default roleGuard;
