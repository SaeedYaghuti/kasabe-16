"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const client_entity_1 = require("./client.entity");
let ClientRepository = class ClientRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('ClientRepository');
    }
    async clientCreate(rClient) {
        const nClient = await client_entity_1.Client.of(rClient);
        const gClient = await this.save(nClient);
        return gClient;
    }
    async clientGetById(rId) {
        const fClient = await client_entity_1.Client.findOne(rId);
        return fClient;
    }
    async clientUpdate(rClient) {
        const fClient = await client_entity_1.Client.findOneOrFail(rClient.client_id);
        const toUpdateClient = Object.assign(fClient, rClient);
        const uClient = await this.save(toUpdateClient);
        return uClient;
    }
    async clientsGetByRoomId(roomId) {
        const fClients = await client_entity_1.Client.createQueryBuilder("client")
            .innerJoin("client.room_clients", "room_client")
            .innerJoin("room_client.room", "room", "room.room_id =:roomId", { roomId })
            .getMany();
        return fClients;
    }
};
ClientRepository = __decorate([
    typeorm_1.EntityRepository(client_entity_1.Client)
], ClientRepository);
exports.ClientRepository = ClientRepository;
//# sourceMappingURL=client.repository.js.map