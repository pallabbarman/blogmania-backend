import { PaginationQueryType } from 'utils/pagination';

export interface CommentQueryType extends PaginationQueryType {
    userId?: string;
    blogId?: string;
}
