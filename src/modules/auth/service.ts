import { compare, hash } from 'bcrypt';
import configs from 'configs/index';
import HttpError from 'errors/httpError';
import { User } from 'generated/prisma/client';
import status from 'http-status';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from 'utils/jwt';
import { prisma } from 'utils/prisma';

export const signUp = async (data: User) => {
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

export const signIn = async (data: User) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (!user) {
        throw new HttpError(status.UNAUTHORIZED, 'Invalid email or password');
    }

    const isPasswordValid = await compare(data.password, user.password);

    if (!isPasswordValid) {
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

export const rotateRefreshToken = async (refreshToken: string) => {
    const payload = verifyRefreshToken(refreshToken) as { userId: string };

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

export const signOut = async (userId: string) => {
    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
    });
};
