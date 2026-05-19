import { UserRole } from '../../generated/prisma/enums.js';
import z from 'zod';
export const userUpdateSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.email().optional(),
    role: z.enum(UserRole).optional(),
    bio: z.string().optional(),
    phone: z.string().optional(),
    profileImage: z.string().optional(),
});
