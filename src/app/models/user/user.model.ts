import { Membership } from '@models/membership/membership.model';

export class User {
    id?: number;
    name: string;
    firstname: string;
    lastname: string;
    email: string;
    profileImageLink: string;
    language?: string;
    online_at?: string;
    created_at?: string;
    password?: string;
    membership: Membership;
}
