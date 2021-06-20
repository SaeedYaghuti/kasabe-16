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
const supplier_entity_1 = require("./supplier.entity");
const person_entity_1 = require("../person/person.entity");
let SupplierRepository = class SupplierRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('SupplierRepository');
    }
    async build(rSupplier) {
        const nPerson = new person_entity_1.Person();
        nPerson.person_role = person_role_enum_1.PersonRole.SUPPLIER;
        nPerson.person_name = rSupplier.supplier_name;
        const gPerson = await nPerson.save();
        const nSupplier = new supplier_entity_1.Supplier();
        nSupplier.person = gPerson;
        nSupplier.supplier_name = rSupplier.supplier_name;
        nSupplier.contact_name = rSupplier.contact_name;
        nSupplier.contact_title = rSupplier.contact_title;
        nSupplier.url = rSupplier.url;
        nSupplier.logo = rSupplier.logo;
        nSupplier.note = rSupplier.note;
        nSupplier.our_id = rSupplier.our_id;
        const gSupplier = await nSupplier.save();
        return gSupplier;
    }
    async rebuild(rSupplier) {
        const fSupplier = await supplier_entity_1.Supplier.findOneOrFail(rSupplier.supplier_id);
        const tuSupplier = Object.assign(fSupplier, rSupplier);
        await supplier_entity_1.Supplier.save(tuSupplier);
        const supplier = this.fetchById(rSupplier.supplier_id);
        return supplier;
    }
    async fetchById(rId) {
        const fSupplier = await supplier_entity_1.Supplier.findOne({
            relations: ["person"],
            where: { supplier_id: rId },
        });
        return fSupplier;
    }
};
SupplierRepository = __decorate([
    typeorm_1.EntityRepository(supplier_entity_1.Supplier)
], SupplierRepository);
exports.SupplierRepository = SupplierRepository;
//# sourceMappingURL=supplier.repository.js.map