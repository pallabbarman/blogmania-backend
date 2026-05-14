import HttpError from 'errors/httpError';
import { Contact } from 'generated/prisma/client';
import status from 'http-status';
import { prisma } from 'utils/prisma';

export const insertContact = async (data: Contact) => {
    const result = await prisma.contact.create({
        data,
    });

    return result;
};

export const findAllContacts = async () => {
    const result = await prisma.contact.findMany({});

    return result;
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
