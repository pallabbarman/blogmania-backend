import { zRequired } from '../../utils/zod.js';
import z from 'zod';
export const createBlogSchema = z.object({
    title: zRequired().max(255),
    image: z.url(),
    description: zRequired(),
    tags: z.array(z.string().trim().min(1)).default([]),
    topicId: z.uuid(),
});
export const updateBlogSchema = z.object({
    title: zRequired().max(255).optional(),
    image: z.url().optional(),
    description: zRequired().optional(),
    tags: z.array(z.string().trim().min(1)).optional(),
    topicId: z.uuid().optional(),
});
