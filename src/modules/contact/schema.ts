import z from 'zod';

export const contactSchema = z.object({
    name: z.string({
        error: 'Name is required!',
    }),
    email: z.string({
        error: 'Email is required!',
    }),
    subject: z.string({
        error: 'Subject is required!',
    }),
    message: z.string({
        error: 'Message is required!',
    }),
});
