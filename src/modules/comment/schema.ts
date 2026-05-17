import { zRequired } from 'utils/zod';
import z from 'zod';

export const commentSchema = z.object({
    comment: zRequired(),
});
