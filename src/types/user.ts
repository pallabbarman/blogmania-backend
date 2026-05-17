import { UserRole } from 'generated/prisma/enums';
import { PaginationQueryType } from 'utils/pagination';

export interface UserQueryType extends PaginationQueryType {
    role?: UserRole;
}
