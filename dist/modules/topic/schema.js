import z from 'zod';
export const topicSchema = z.object({
    name: z.string({
        error: 'Topic name is required!',
    }),
});
