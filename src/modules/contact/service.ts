import HttpError from 'errors/httpError';
import { Contact, Prisma } from 'generated/prisma/client';
import status from 'http-status';
import { ContactQueryType } from 'types/contact';
import { buildPaginationMetaData, getPaginationSkipData } from 'utils/pagination';
import { prisma } from 'utils/prisma';
import { isAllowedSortField } from 'utils/sort';
import { contactSortFields } from './constant';

export const insertContact = async (data: Contact) => {
    const result = await prisma.contact.create({
        data,
    });

    return result;
};

export const findAllContacts = async (query: ContactQueryType) => {
    const { page, limit, search, sortBy, sortOrder } = query;
    const skip = getPaginationSkipData(page, limit);

    const where: Prisma.ContactWhereInput = {
        ...(search && {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { subject: { contains: search, mode: 'insensitive' } },
            ],
        }),
    };

    const orderBy: Prisma.ContactOrderByWithRelationInput = isAllowedSortField(
        sortBy,
        contactSortFields
    )
        ? { [sortBy]: sortOrder }
        : { createdAt: sortOrder };

    const [contacts, total] = await prisma.$transaction([
        prisma.contact.findMany({ where, orderBy, skip, take: limit }),
        prisma.contact.count({ where }),
    ]);

    return { contacts, meta: buildPaginationMetaData(total, page, limit) };
};

export const findContact = async (id: string) => {
    const result = await prisma.contact.findUnique({
        where: { id },
    });

    if (!result) {
        throw new HttpError(status.NOT_FOUND, 'Information not found!');
    }

    return result;
};

export const removeContact = async (id: string) => {
    const result = await prisma.contact.delete({
        where: { id },
    });

    return result;
};
