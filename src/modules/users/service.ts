import HttpError from 'errors/httpError';
import { Prisma, User } from 'generated/prisma/client';
import status from 'http-status';
import { UserQueryType } from 'types/user';
import { buildPaginationMetaData, getPaginationSkipData } from 'utils/pagination';
import { prisma } from 'utils/prisma';
import { isAllowedSortField } from 'utils/sort';
import { userSortFields } from './constant';

export const findAllUsers = async (query: UserQueryType) => {
    const { page, limit, search, sortBy, sortOrder, role } = query;
    const skip = getPaginationSkipData(page, limit);

    const where: Prisma.UserWhereInput = {
        // Search across firstName, lastName, and email
        ...(search && {
            OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ],
        }),
        // Filter by role
        ...(role && { role: { equals: role } }),
    };

    const orderBy: Prisma.UserOrderByWithRelationInput = isAllowedSortField(sortBy, userSortFields)
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };

    const [users, total] = await prisma.$transaction([
        prisma.user.findMany({
            where,
            omit: { password: true },
            orderBy,
            skip,
            take: limit,
        }),
        prisma.user.count({ where }),
    ]);

    return { users, meta: buildPaginationMetaData(total, page, limit) };
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
