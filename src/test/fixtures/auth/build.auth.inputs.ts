import { AuthType } from '../../../auth/auth/auth_type.enum';
import { CreateAuthInput } from '../../../auth/auth/dto/create.auth.input';

export const BuildAuthInputs: CreateAuthInput[] = [
    
    {
        authname: "saeid",
        password: "1234",
        auth_type: [ AuthType.ADMIN ]
    },
    {
        authname: "ibrahim",
        password: "1234",
        auth_type: [ AuthType.MERCHANT ]
    },
    
    
]
