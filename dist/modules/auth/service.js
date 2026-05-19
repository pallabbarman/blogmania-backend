import { compare, hash } from 'bcrypt';
import configs from '../../configs/env.js';
import HttpError from '../../errors/httpError.js';
import status from 'http-status';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';
import { errorLogger } from '../../utils/logger.js';
import { prisma } from '../../utils/prisma.js';
export const signUp = async (data) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (existingUser) {
        throw new HttpError(status.CONFLICT, 'User already exists');
    }
    const hashedPassword = await hash(data.password, Number(configs.bcryptSalt));
    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
        },
    });
    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id });
    await prisma.user.update({
        where: { id: user.id },
        data: {
            refreshToken: await hash(refreshToken, Number(configs.bcryptSalt)),
        },
    });
    return { accessToken, refreshToken };
};
export const signIn = async (data) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (!user) {
        errorLogger.warn(`Failed login attempt — email not found: ${data.email}`);
        throw new HttpError(status.UNAUTHORIZED, 'Invalid email or password');
    }
    const isPasswordValid = await compare(data.password, user.password);
    if (!isPasswordValid) {
        errorLogger.warn(`Failed login attempt — wrong password for: ${data.email}`);
        throw new HttpError(status.UNAUTHORIZED, 'Invalid email or password');
    }
    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id });
    await prisma.user.update({
        where: { id: user.id },
        data: {
            refreshToken: await hash(refreshToken, Number(configs.bcryptSalt)),
        },
    });
    return { accessToken, refreshToken };
};
export const rotateRefreshToken = async (refreshToken) => {
    const payload = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
    });
    if (!user || !user.refreshToken) {
        throw new HttpError(status.UNAUTHORIZED, 'Invalid refresh token');
    }
    const valid = await compare(refreshToken, user.refreshToken);
    if (!valid) {
        throw new HttpError(status.UNAUTHORIZED, 'Invalid refresh token');
    }
    const newAccessToken = generateAccessToken({ userId: user.id, role: user.role });
    const newRefreshToken = generateRefreshToken({ userId: user.id });
    await prisma.user.update({
        where: { id: user.id },
        data: {
            refreshToken: await hash(newRefreshToken, Number(configs.bcryptSalt)),
        },
    });
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
export const signOut = async (userId) => {
    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
    });
};
