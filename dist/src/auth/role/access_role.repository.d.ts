import { Repository } from 'typeorm';
import { AccessRole } from './access_role.entity';
import { CreateAccessRoleInput } from './dto/create.access_role.input';
import { UpdateAccessRoleInput } from './dto/update.access_role.input';
export declare class AccessRoleRepository extends Repository<AccessRole> {
    private logger;
    createAccessRole(rAccessRole: CreateAccessRoleInput): Promise<void>;
    updateAccessRole(rAccessRole: UpdateAccessRoleInput): Promise<void>;
    getAccessRoleById(rId: number): Promise<void>;
}
