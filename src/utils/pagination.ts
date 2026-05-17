import { Request } from 'express';
import z from 'zod';

export const paginationQuerySchema = z.object({
    page: z
        .string()
        .optional()
        .transform((v) => (v ? Math.max(1, parseInt(v, 10)) : 1)),
    limit: z
        .string()
        .optional()
        .transform((v) => {
            const n = v ? parseInt(v, 10) : 10;
            return Math.min(Math.max(1, n), 100); // clamp between 1–100
        }),
    search: z.string().trim().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type PaginationQueryType = z.infer<typeof paginationQuerySchema>;

export const parsePaginationQuery = (req: Request): PaginationQueryType => {
    const result = paginationQuerySchema.safeParse(req.query);
    if (!result.success) {
        return { page: 1, limit: 10, sortOrder: 'desc' };
    }
    return result.data;
};

export const buildPaginationMetaData = (total: number, page: number, limit: number) => ({
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1,
});

export const getPaginationSkipData = (page: number, limit: number) => (page - 1) * limit;
