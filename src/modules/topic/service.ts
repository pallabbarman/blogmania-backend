import HttpError from 'errors/httpError';
import { Topic } from 'generated/prisma/client';
import status from 'http-status';
import { prisma } from 'utils/prisma';

export const insertTopic = async (data: Topic) => {
    const result = await prisma.topic.create({
        data,
    });

    return result;
};

export const findAllTopics = async () => {
    const result = await prisma.topic.findMany();

    return result;
};

export const findTopic = async (id: string) => {
    const result = await prisma.topic.findUnique({ where: { id } });

    if (!result) {
        throw new HttpError(status.NOT_FOUND, 'Topic not found!');
    }

    return result;
};

export const patchTopic = async (id: string, data: Partial<Topic>) => {
    const result = await prisma.topic.update({
        where: { id },
        data,
    });

    return result;
};

export const removeTopic = async (id: string) => {
    const result = await prisma.topic.delete({ where: { id } });

    return result;
};
