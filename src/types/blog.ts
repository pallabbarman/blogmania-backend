import { PaginationQueryType } from 'utils/pagination';

export interface BlogQueryType extends PaginationQueryType {
    topicId?: string;
    tag?: string;
    userId?: string;
}
