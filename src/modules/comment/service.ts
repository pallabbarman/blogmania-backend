import HttpError from 'errors/httpError';
import { Comment, Prisma } from 'generated/prisma/client';
import status from 'http-status';
import { CommentQueryType } from 'types/comment';
import { buildPaginationMetaData, getPaginationSkipData } from 'utils/pagination';
import { prisma } from 'utils/prisma';
import { isAllowedSortField } from 'utils/sort';
import { commentSortFields } from './constant';

export const insertComment = async (data: Comment) => {
    const result = await prisma.comment.create({
        data,
    });

    return result;
};

export const findAllComments = async (query: CommentQueryType) => {
    const { page, limit, search, sortBy, sortOrder, blogId, userId } = query;
    const skip = getPaginationSkipData(page, limit);

    const where: Prisma.CommentWhereInput = {
        ...(blogId && { blogId }),
        ...(userId && { userId }),
        ...(search && {
            OR: [{ comment: { contains: search, mode: 'insensitive' } }],
        }),
    };

    const orderBy: Prisma.CommentOrderByWithRelationInput = isAllowedSortField(
        sortBy,
        commentSortFields
    )
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };

    const [comments, total] = await prisma.$transaction([
        prisma.comment.findMany({ where, orderBy, skip, take: limit }),
        prisma.comment.count({ where }),
    ]);

    return { comments, meta: buildPaginationMetaData(total, page, limit) };
};

export const findComment = async (id: string) => {
    const result = await prisma.comment.findUnique({
        where: { id },
    });

    if (!result) {
        throw new HttpError(status.NOT_FOUND, 'Information not found!');
    }

    return result;
};

export const patchComment = async (id: string, data: Partial<Comment>) => {
    const result = await prisma.comment.update({
        where: { id },
        data,
    });

    return result;
};

export const removeComment = async (id: string) => {
    const result = await prisma.comment.delete({
        where: { id },
    });

    return result;
};
