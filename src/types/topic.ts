import { PaginationQueryType } from 'utils/pagination';

export interface TopicQueryType extends PaginationQueryType {
    name?: string;
}
