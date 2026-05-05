import { prisma } from 'utils/prisma';

export const findAllUsers = async () => {
    const result = await prisma.user.findMany();

    return result;
};
