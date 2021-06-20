import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone, MaxLength, MinLength, Matches } from 'class-validator';
import { ClientRole } from '../../client/client_role.enum';
export class RoomClientUpdateDto {

    // TODO: we should accept client's Object or id 

    @IsNotEmpty()
    @IsInt()
    room_client_id!: number;

    // @IsNotEmpty()
    // @IsInt()
    // client_id!: number;
    
    // @IsNotEmpty()
    // @IsInt()
    // room_id!: number;

    // TODO: if we had other field we can make it IsOtional
    @IsNotEmpty()
    @IsEnum(ClientRole)
    client_role!: ClientRole;

    // TODO: maybe we need some field heart
    // join_at, left_at, is_member, 
}
