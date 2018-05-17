import { Membership } from '@models/membership/membership.model';

export class PaginatedMembership {
    current_page: number;
    data: Membership[];
    from: number;
    last_page: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}
