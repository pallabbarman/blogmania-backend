import HttpError from 'errors/httpError';
import { Comment } from 'generated/prisma/client';
import status from 'http-status';
import { prisma } from 'utils/prisma';

export const insertComment = async (data: Comment) => {
    const result = await prisma.comment.create({
        data,
    });

    return result;
};

export const findAllComments = async () => {
    const result = await prisma.comment.findMany();

    return result;
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
