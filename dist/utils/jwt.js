import configs from '../configs/env.js';
import jwt from 'jsonwebtoken';
export const generateAccessToken = (payload) => jwt.sign(payload, configs.jwt.accessSecret, {
    expiresIn: Number(configs.jwt.accessExpiresIn),
});
export const generateRefreshToken = (payload) => jwt.sign(payload, configs.jwt.refreshSecret, {
    expiresIn: Number(configs.jwt.refreshExpiresIn),
});
export const verifyAccessToken = (token) => jwt.verify(token, configs.jwt.accessSecret);
export const verifyRefreshToken = (token) => jwt.verify(token, configs.jwt.refreshSecret);
