import HttpError from '../../errors/httpError.js';
import status from 'http-status';
import { buildPaginationMetaData, getPaginationSkipData } from '../../utils/pagination.js';
import { prisma } from '../../utils/prisma.js';
import { isAllowedSortField } from '../../utils/sort.js';
import { contactSortFields } from './constant.js';
export const insertContact = async (data) => {
    const result = await prisma.contact.create({
        data,
    });
    return result;
};
export const findAllContacts = async (query) => {
    const { page, limit, search, sortBy, sortOrder } = query;
    const skip = getPaginationSkipData(page, limit);
    const where = {
        ...(search && {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { subject: { contains: search, mode: 'insensitive' } },
            ],
        }),
    };
    const orderBy = isAllowedSortField(sortBy, contactSortFields)
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };
    const [contacts, total] = await prisma.$transaction([
        prisma.contact.findMany({ where, orderBy, skip, take: limit }),
        prisma.contact.count({ where }),
    ]);
    return { contacts, meta: buildPaginationMetaData(total, page, limit) };
};
export const findContact = async (id) => {
    const result = await prisma.contact.findUnique({
        where: { id },
    });
    if (!result) {
        throw new HttpError(status.NOT_FOUND, 'Information not found!');
    }
    return result;
};
export const removeContact = async (id) => {
    const result = await prisma.contact.delete({
        where: { id },
    });
    return result;
};
