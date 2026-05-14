import { Contact } from 'generated/prisma/client';
import status from 'http-status';
import { asyncHandler } from 'utils/asyncHandler';
import { sendResponse } from 'utils/response';
import { requiredField } from 'utils/validate';
import { findAllContacts, findContact, insertContact, removeContact } from './service';

export const createContact = asyncHandler(async (req, res) => {
    const result = await insertContact(req.body);

    sendResponse<Contact>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Thank you for contacting with us. We will reach you out shortly!',
        data: result,
    });
});

export const getAllContacts = asyncHandler(async (_req, res) => {
    const result = await findAllContacts();

    sendResponse<Contact[]>(res, {
        statusCode: status.OK,
        success: true,
        message: 'All contact information are retrieved successfully!',
        data: result,
    });
});

export const getContact = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const result = await findContact(id);

    sendResponse<Contact>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Contact information is retrieved successfully!',
        data: result,
    });
});

export const deleteContact = asyncHandler(async (req, res) => {
    const id = requiredField(req.params.id, 'Id');

    const result = await removeContact(id);

    sendResponse<Contact>(res, {
        statusCode: status.OK,
        success: true,
        message: 'Contact deleted successfully!',
        data: result,
    });
});
