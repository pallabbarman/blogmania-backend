import HttpError from 'errors/httpError';
import { User } from 'generated/prisma/client';
import status from 'http-status';
import { prisma } from 'utils/prisma';

export const findAllUsers = async () => {
    const result = await prisma.user.findMany({
        omit: { password: true },
    });

    return result;
};

export const findUser = async (id: string) => {
    const result = await prisma.user.findUnique({ where: { id }, omit: { password: true } });

    if (!result) {
        throw new HttpError(status.NOT_FOUND, 'User not found!');
    }

    return result;
};

export const patchUser = async (id: string, payload: Partial<User>) => {
    const result = await prisma.user.update({
        where: { id },
        data: payload,
        omit: { password: true },
    });

    return result;
};

export const removeUser = async (id: string) => {
    const result = await prisma.user.delete({
        where: { id },
    });

    return result;
};
