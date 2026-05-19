import HttpError from '../../errors/httpError.js';
import status from 'http-status';
import { buildPaginationMetaData, getPaginationSkipData } from '../../utils/pagination.js';
import { prisma } from '../../utils/prisma.js';
import { isAllowedSortField } from '../../utils/sort.js';
import { topicSortFields } from './constant.js';
export const insertTopic = async (data) => {
    const result = await prisma.topic.create({
        data,
    });
    return result;
};
export const findAllTopics = async (query) => {
    const { page, limit, search, sortBy, sortOrder, name } = query;
    const skip = getPaginationSkipData(page, limit);
    const where = {
        ...(name && { name }),
        ...(search && {
            OR: [{ name: { contains: search, mode: 'insensitive' } }],
        }),
    };
    const orderBy = isAllowedSortField(sortBy, topicSortFields)
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };
    const [topics, total] = await prisma.$transaction([
        prisma.topic.findMany({ where, orderBy, skip, take: limit }),
        prisma.topic.count({ where }),
    ]);
    return { topics, meta: buildPaginationMetaData(total, page, limit) };
};
export const findTopic = async (id) => {
    const result = await prisma.topic.findUnique({ where: { id } });
    if (!result) {
        throw new HttpError(status.NOT_FOUND, 'Topic not found!');
    }
    return result;
};
export const patchTopic = async (id, data) => {
    const result = await prisma.topic.update({
        where: { id },
        data,
    });
    return result;
};
export const removeTopic = async (id) => {
    const result = await prisma.topic.delete({ where: { id } });
    return result;
};
