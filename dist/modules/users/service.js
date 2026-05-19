import HttpError from '../../errors/httpError.js';
import status from 'http-status';
import { buildPaginationMetaData, getPaginationSkipData } from '../../utils/pagination.js';
import { prisma } from '../../utils/prisma.js';
import { isAllowedSortField } from '../../utils/sort.js';
import { userSortFields } from './constant.js';
export const findAllUsers = async (query) => {
    const { page, limit, search, sortBy, sortOrder, role } = query;
    const skip = getPaginationSkipData(page, limit);
    const where = {
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
    const orderBy = isAllowedSortField(sortBy, userSortFields)
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
export const findUser = async (id) => {
    const result = await prisma.user.findUnique({ where: { id }, omit: { password: true } });
    if (!result) {
        throw new HttpError(status.NOT_FOUND, 'User not found!');
    }
    return result;
};
export const patchUser = async (id, payload) => {
    const result = await prisma.user.update({
        where: { id },
        data: payload,
        omit: { password: true },
    });
    return result;
};
export const removeUser = async (id) => {
    const result = await prisma.user.delete({
        where: { id },
    });
    return result;
};
