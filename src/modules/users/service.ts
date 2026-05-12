import HttpError from 'errors/httpError';
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
