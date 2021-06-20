import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';
import { ClientCreateDto } from './dto/client_create.dto';
import { ClientUpdateDto } from './dto/client_update.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class ClientService {
    constructor(
        // Client
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,

    ) {}

    private logger = new Logger('ClientService');

    // Client
    public async clientCreate( rClient: ClientCreateDto ): Promise<Client> {
    
        // const nClient = await Client.of(rClient);
        const nClient = this.clientRepository.create(rClient);
        await validateOrReject(nClient);
        const gClient = await this.clientRepository.save(nClient);

        return gClient;
    }

    public async clientGetById( rId: number ): Promise<Client> {

        const fClient = await this.clientRepository.findOne(rId);
        return fClient;
    } 
    
    public async findAll(): Promise<Client[]> {

        const fClients = await this.clientRepository.find();
        return fClients;
    } 
    
    public async clientUpdate( rClient: ClientUpdateDto ): Promise<Client> {
        
        const fClient = await this.clientRepository.findOneOrFail(rClient.client_id);

        const toUpdateClient = Object.assign(fClient, rClient);
        // 🎯  TODO: Delete some attribute that only must by changed by authenticated 
        // delete toUpdateClient.created_at;
        // delete toUpdateClient.is_active;
        // delete toUpdateClient.is_blocked;
        // delete toUpdateClient.is_reported;
        // delete toUpdateClient.password;
        // delete toUpdateClient.updated_at;

        await validateOrReject(toUpdateClient);

        // update Client
        const uClient = await this.clientRepository.save(toUpdateClient);
        return uClient;
        
    }

    public async clientsGetByRoomId( roomId: number ): Promise<Client[]> {

        const fClients = await this.clientRepository.createQueryBuilder("client")
        .innerJoin("client.room_clients", "room_client")
        .innerJoin("room_client.room", "room", "room.room_id =:roomId", { roomId })
        .getMany();
        // console.log('fClients: ', fClients);

        return fClients;
    } 
}
