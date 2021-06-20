import { Auth } from "../../../auth/auth/auth.entity";
import { AuthType } from '../../../auth/auth/auth_type.enum';


export const AuthEntities: Partial<Auth> [] = [
    {
        authname: "saeid",
        password: "1234",
        salt: "itsouldbesalt",
        auth_type: AuthType.ADMIN,
        roles: [ AuthType.ADMIN ]
    },
    {
        authname: "ibrahim",
        password: "1234",
        salt: "itsouldbesalt",
        auth_type: AuthType.MERCHANT,
        roles: [ AuthType.MERCHANT ]
    },
    
]
