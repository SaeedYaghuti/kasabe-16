import { AuthType } from '../auth_type.enum';
export declare class CreateAuthInput {
    authname: string;
    password: string;
    auth_type?: AuthType[];
}
