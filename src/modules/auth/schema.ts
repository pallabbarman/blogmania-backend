import { zRequired, zValidEmail, zValidPassword } from 'utils/zod';
import z from 'zod';

export const registerSchema = z.object({
    firstName: zRequired(),
    lastName: zRequired(),
    email: zValidEmail(),
    password: zValidPassword(),
});

export const loginSchema = z.object({
    email: zValidEmail(),
    password: zValidPassword(),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string(),
});
