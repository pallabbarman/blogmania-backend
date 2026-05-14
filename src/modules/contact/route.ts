import { Router } from 'express';
import { UserRole } from 'generated/prisma/enums';
import authGuard from 'middlewares/authGuard';
import roleGuard from 'middlewares/roleGuard';
import { validateSchema } from 'utils/validate';
import { createContact, deleteContact, getAllContacts, getContact } from './controller';
import { contactSchema } from './schema';

const contactRoutes = Router();

contactRoutes.get('/', authGuard, roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN), getAllContacts);
contactRoutes.get('/:id', authGuard, roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN), getContact);
contactRoutes.post('/', validateSchema(contactSchema), createContact);
contactRoutes.delete(
    '/:id',
    authGuard,
    roleGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    deleteContact
);

export default contactRoutes;
