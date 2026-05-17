import configs from 'configs/env';
import jwt, { Secret } from 'jsonwebtoken';

export const generateAccessToken = (payload: Record<string, unknown>) =>
    jwt.sign(payload, configs.jwt.accessSecret as Secret, {
        expiresIn: Number(configs.jwt.accessExpiresIn),
    });

export const generateRefreshToken = (payload: Record<string, unknown>) =>
    jwt.sign(payload, configs.jwt.refreshSecret as Secret, {
        expiresIn: Number(configs.jwt.refreshExpiresIn),
    });

export const verifyAccessToken = (token: string) =>
    jwt.verify(token, configs.jwt.accessSecret as Secret);

export const verifyRefreshToken = (token: string) =>
    jwt.verify(token, configs.jwt.refreshSecret as Secret);
