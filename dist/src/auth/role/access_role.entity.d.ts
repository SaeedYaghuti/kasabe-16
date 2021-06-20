import { BaseEntity } from 'typeorm';
import { CreateAccessRoleInput } from './dto/create.access_role.input';
export declare class AccessRole extends BaseEntity {
    role_id: number;
    role_resource: string;
    role_action: string;
    role_possession: string;
    static of(rAccessRole: CreateAccessRoleInput): AccessRole;
    checkDataValidation(): Promise<void>;
}
