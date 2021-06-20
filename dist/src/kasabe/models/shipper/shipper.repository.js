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
const person_role_enum_1 = require("../person/person_role.enum");
const shipper_entity_1 = require("./shipper.entity");
const person_entity_1 = require("../person/person.entity");
let ShipperRepository = class ShipperRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('ShipperRepository');
    }
    async build(rShipper) {
        console.log('ShipperRepository: Shipper => rData: ', rShipper);
        const nPerson = new person_entity_1.Person();
        nPerson.person_role = person_role_enum_1.PersonRole.SHIPPER;
        nPerson.person_name = rShipper.shipper_name;
        let gPerson;
        try {
            gPerson = await nPerson.save();
            console.log('gPerson: ', gPerson);
        }
        catch (error) {
            this.logger.error(`!> Failed to save person: ${JSON.stringify(nPerson)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to save person',
                origin: '@shipper.repository.ts',
                person: nPerson,
                error: error.stack,
            });
        }
        const nShipper = new shipper_entity_1.Shipper();
        nShipper.person = gPerson;
        nShipper.shipper_name = rShipper.shipper_name;
        nShipper.contact_name = rShipper.contact_name;
        nShipper.contact_title = rShipper.contact_title;
        nShipper.url = rShipper.url;
        nShipper.logo = rShipper.logo;
        nShipper.note = rShipper.note;
        nShipper.our_id = rShipper.our_id;
        try {
            const gShipper = await nShipper.save();
            console.log('gShipper: ', gShipper);
            return gShipper;
        }
        catch (error) {
            this.logger.error(`!> Failed to save shipper: ${JSON.stringify(rShipper)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to save shipper',
                origin: '@shipper.repository.ts',
                shipper: rShipper,
                error: error.stack,
            });
        }
    }
    async rebuild(rShipper) {
        const fShipper = await shipper_entity_1.Shipper.findOneOrFail(rShipper.shipper_id);
        const tuShipper = Object.assign(fShipper, rShipper);
        await shipper_entity_1.Shipper.save(tuShipper);
        const shipper = this.fetchById(rShipper.shipper_id);
        return shipper;
    }
    async fetchById(rId) {
        const fShipper = await shipper_entity_1.Shipper.findOne({
            relations: ["person"],
            where: { shipper_id: rId },
        });
        return fShipper;
    }
};
ShipperRepository = __decorate([
    typeorm_1.EntityRepository(shipper_entity_1.Shipper)
], ShipperRepository);
exports.ShipperRepository = ShipperRepository;
//# sourceMappingURL=shipper.repository.js.map