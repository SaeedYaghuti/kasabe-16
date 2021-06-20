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
const order_details_entity_1 = require("./order_details.entity");
let OrderDetailsRepository = class OrderDetailsRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('OrderDetailsRepository');
    }
    async buildDetails(rOrderDetails) {
        console.log('OrderDetailsRepository rData: ', rOrderDetails);
        const nOrderDetails = order_details_entity_1.OrderDetails.of(rOrderDetails);
        const gOrderDetails = order_details_entity_1.OrderDetails.save(nOrderDetails);
        return gOrderDetails;
    }
    async getOrderDetailsById(rId) {
        console.log('OrderDetailsRepository rId: ', rId);
        const fOrderDetails = await order_details_entity_1.OrderDetails.findOne({
            where: { order_details_id: rId },
            relations: ["order", "product", "shipper"],
        });
        return fOrderDetails;
    }
    async rebuildDetails(rOrderDetails) {
        console.log('OrderDetailsRepository rData: ', rOrderDetails);
        const fOrderDetails = await order_details_entity_1.OrderDetails.findOneOrFail({ order_details_id: rOrderDetails.order_details_id });
        Object.assign(fOrderDetails, rOrderDetails);
        const uOrderDetails = await order_details_entity_1.OrderDetails.save(fOrderDetails);
        return await this.getOrderDetailsById(uOrderDetails.order_details_id);
    }
};
OrderDetailsRepository = __decorate([
    typeorm_1.EntityRepository(order_details_entity_1.OrderDetails)
], OrderDetailsRepository);
exports.OrderDetailsRepository = OrderDetailsRepository;
//# sourceMappingURL=order_details.repository.js.map