import { zRequired } from '../../utils/zod.js';
import z from 'zod';
export const commentSchema = z.object({
    comment: zRequired(),
});
