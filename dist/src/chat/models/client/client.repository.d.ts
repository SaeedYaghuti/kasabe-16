import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { ClientUpdateDto } from './dto/client_update.dto';
import { ClientCreateInput } from './dto/client_create.input';
export declare class ClientRepository extends Repository<Client> {
    private logger;
    clientCreate(rClient: ClientCreateInput): Promise<Client>;
    clientGetById(rId: number): Promise<Client>;
    clientUpdate(rClient: ClientUpdateDto): Promise<Client>;
    clientsGetByRoomId(roomId: number): Promise<Client[]>;
}
