import { RolesBuilder } from "nest-access-control/roles-builder.class";
import { AuthType } from './auth/auth_type.enum';


export const roles: RolesBuilder = new RolesBuilder();

roles
    .grant(AuthType.CUSTOMER)
        .createOwn('video')
        .deleteOwn('video')
        .readAny('video')
        .createOwn('file')
        .deleteOwn('file')
        .readAny('file')
    .grant(AuthType.ADMIN)
        .extend(AuthType.CUSTOMER)
        .updateAny('video')
        .deleteAny('video');