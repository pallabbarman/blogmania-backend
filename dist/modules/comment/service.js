import HttpError from '../../errors/httpError.js';
import status from 'http-status';
import { buildPaginationMetaData, getPaginationSkipData } from '../../utils/pagination.js';
import { prisma } from '../../utils/prisma.js';
import { isAllowedSortField } from '../../utils/sort.js';
import { commentSortFields } from './constant.js';
export const insertComment = async (data) => {
    const result = await prisma.comment.create({
        data,
    });
    return result;
};
export const findAllComments = async (query) => {
    const { page, limit, search, sortBy, sortOrder, blogId, userId } = query;
    const skip = getPaginationSkipData(page, limit);
    const where = {
        ...(blogId && { blogId }),
        ...(userId && { userId }),
        ...(search && {
            OR: [{ comment: { contains: search, mode: 'insensitive' } }],
        }),
    };
    const orderBy = isAllowedSortField(sortBy, commentSortFields)
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };
    const [comments, total] = await prisma.$transaction([
        prisma.comment.findMany({ where, orderBy, skip, take: limit }),
        prisma.comment.count({ where }),
    ]);
    return { comments, meta: buildPaginationMetaData(total, page, limit) };
};
export const findComment = async (id) => {
    const result = await prisma.comment.findUnique({
        where: { id },
    });
    if (!result) {
        throw new HttpError(status.NOT_FOUND, 'Information not found!');
    }
    return result;
};
export const patchComment = async (id, data) => {
    const result = await prisma.comment.update({
        where: { id },
        data,
    });
    return result;
};
export const removeComment = async (id) => {
    const result = await prisma.comment.delete({
        where: { id },
    });
    return result;
};
