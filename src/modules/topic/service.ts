import HttpError from 'errors/httpError';
import { Prisma, Topic } from 'generated/prisma/client';
import status from 'http-status';
import { TopicQueryType } from 'types/topic';
import { buildPaginationMetaData, getPaginationSkipData } from 'utils/pagination';
import { prisma } from 'utils/prisma';
import { isAllowedSortField } from 'utils/sort';
import { topicSortFields } from './constant';

export const insertTopic = async (data: Topic) => {
    const result = await prisma.topic.create({
        data,
    });

    return result;
};

export const findAllTopics = async (query: TopicQueryType) => {
    const { page, limit, search, sortBy, sortOrder, name } = query;
    const skip = getPaginationSkipData(page, limit);

    const where: Prisma.TopicWhereInput = {
        ...(name && { name }),
        ...(search && {
            OR: [{ name: { contains: search, mode: 'insensitive' } }],
        }),
    };

    const orderBy: Prisma.TopicOrderByWithRelationInput = isAllowedSortField(
        sortBy,
        topicSortFields
    )
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };

    const [topics, total] = await prisma.$transaction([
        prisma.topic.findMany({ where, orderBy, skip, take: limit }),
        prisma.topic.count({ where }),
    ]);

    return { topics, meta: buildPaginationMetaData(total, page, limit) };
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
