import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone, MaxLength, MinLength, Matches, IsArray } from 'class-validator';
import { ClientRole } from '../../client/client_role.enum';
import { Type } from 'class-transformer';
import { Room } from '../../room/room.entity';
import { Client } from '../../client/client.entity';

class ClientRoleCreateDto {
    @IsNotEmpty()
    @IsInt()
    client_id!: number;
    
    @IsNotEmpty()
    @IsEnum(ClientRole)
    client_role: ClientRole;
}

export class RoomClientCreateDto {
    
    @IsNotEmpty()
    @IsInt()
    room_id!: number;

    @IsNotEmpty()
    @IsInt()
    client_id!: number;
    
    @IsNotEmpty()
    @IsEnum(ClientRole)
    client_role: ClientRole;

    // @IsNotEmpty()
    // @IsArray()
    // @Type(() => ClientRoleCreateDto)
    // arr_client_role: ClientRoleCreateDto[];
}

export class RoomClientCascadeDto {
    
    @IsNotEmpty()
    room!: Room;

    @IsNotEmpty()
    client!: Client;
    
    @IsNotEmpty()
    @IsEnum(ClientRole)
    client_role!: ClientRole;

}
