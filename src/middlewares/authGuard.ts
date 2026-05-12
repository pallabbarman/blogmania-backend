import HttpError from 'errors/httpError';
import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { verifyRefreshToken } from 'utils/jwt';

const authGuard = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new HttpError(status.UNAUTHORIZED, 'Unauthorized'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyRefreshToken(token as string) as JwtPayload;

        req.user = decoded;
        next();
    } catch {
        next(new HttpError(status.UNAUTHORIZED, 'Invalid or expired token'));
    }
};

export default authGuard;
