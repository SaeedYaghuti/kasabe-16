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
const order_entity_1 = require("./order.entity");
const order_details_entity_1 = require("../order_details/order_details.entity");
const product_entity_1 = require("../product/product.entity");
let OrderRepository = class OrderRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('OrderRepository');
    }
    async build(rOrder) {
        console.log('OrderRepository rOrder: ', rOrder);
        const orderDetailsEntities = [];
        for (const detailEl of rOrder.order_details) {
            const nOrderDetails = new order_details_entity_1.OrderDetails();
            nOrderDetails.product_id = detailEl.product_id;
            nOrderDetails.quantity = detailEl.quantity;
            nOrderDetails.shipper_id = detailEl.shipper_id;
            nOrderDetails.required_date = new Date(detailEl.required_date);
            nOrderDetails.ship_date = new Date(detailEl.ship_date);
            nOrderDetails.status = detailEl.status;
            const fProduct = await product_entity_1.Product.findOneOrFail(detailEl.product_id);
            nOrderDetails.msrp = fProduct.msrp;
            nOrderDetails.discount = fProduct.discount;
            nOrderDetails.price = fProduct.price;
            orderDetailsEntities.push(nOrderDetails);
        }
        const nOrder = order_entity_1.Order.of(rOrder);
        Object.assign(nOrder, rOrder);
        nOrder.order_details = orderDetailsEntities;
        const gOrder = await order_entity_1.Order.save(nOrder);
        console.log('gOrder: ', gOrder);
        const fOrder = await this.fetchById(gOrder.order_id);
        return fOrder;
    }
    async build0(rOrder) {
        console.log('OrderRepository rData: ', rOrder);
        const orderDetailsEntities = [];
        for (const detailEl of rOrder.order_details) {
            const nOrderDetails = new order_details_entity_1.OrderDetails();
            nOrderDetails.product_id = detailEl.product_id;
            try {
                const fProduct = await product_entity_1.Product.findOne(detailEl.product_id);
                nOrderDetails.msrp = fProduct.msrp;
                nOrderDetails.discount = fProduct.discount;
                nOrderDetails.price = fProduct.price;
            }
            catch (error) {
                this.logger.warn(`!> Failed to create new OrderDetails when fetch product by id: ${JSON.stringify(detailEl.product_id)};`);
            }
            nOrderDetails.quantity = detailEl.quantity;
            nOrderDetails.shipper_id = detailEl.shipper_id;
            nOrderDetails.required_date = new Date(detailEl.required_date);
            nOrderDetails.ship_date = new Date(detailEl.ship_date);
            nOrderDetails.status = detailEl.status;
            orderDetailsEntities.push(nOrderDetails);
        }
        const nOrder = new order_entity_1.Order();
        nOrder.order_number = rOrder.order_number;
        nOrder.customer_id = rOrder.customer_id;
        nOrder.shipper_id = rOrder.shipper_id;
        nOrder.order_date = new Date(rOrder.order_date);
        nOrder.required_date = new Date(rOrder.required_date);
        nOrder.ship_date = new Date(rOrder.ship_date);
        nOrder.freight = rOrder.freight;
        nOrder.status = rOrder.status;
        nOrder.order_details = orderDetailsEntities;
        try {
            const gOrder = await nOrder.save();
            console.log('gOrder: ', gOrder);
            return gOrder;
        }
        catch (error) {
            this.logger.error(`!> Failed to save order: ${JSON.stringify(rOrder)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to save order',
                origin: '@order.repository.ts',
                order: rOrder,
            });
        }
    }
    async rebuild(rOrder) {
        var _a;
        console.log('OrderRepository rOrder: ', rOrder);
        const tuOrder = await order_entity_1.Order.findOneOrFail({
            relations: ["order_details"],
            where: { order_id: rOrder.order_id },
        });
        delete tuOrder.customer;
        delete tuOrder.shipper;
        for (const detailEl of tuOrder.order_details) {
            const rDetail = (_a = rOrder) === null || _a === void 0 ? void 0 : _a.order_details.find(d => d.order_details_id === detailEl.order_details_id);
            if (!rDetail)
                break;
            Object.assign(detailEl, rDetail);
        }
        delete rOrder.order_details;
        Object.assign(tuOrder, rOrder);
        console.log('<rebuild| tuOrder>', tuOrder);
        const uOrder = await order_entity_1.Order.save(tuOrder);
        return await this.fetchById(uOrder.order_id);
    }
    async rebuild0(rOrder) {
        console.log('OrderRepository rData: ', rOrder);
        const orderDetailsEntities = [];
        for (const detailEl of rOrder.order_details) {
            const nOrderDetails = new order_details_entity_1.OrderDetails();
            nOrderDetails.order_details_id = detailEl.order_details_id;
            nOrderDetails.quantity = detailEl.quantity;
            nOrderDetails.shipper_id = detailEl.shipper_id;
            nOrderDetails.required_date = new Date(detailEl.required_date);
            nOrderDetails.ship_date = new Date(detailEl.ship_date);
            nOrderDetails.freight = detailEl.freight;
            nOrderDetails.status = detailEl.status;
            orderDetailsEntities.push(nOrderDetails);
        }
        const nOrder = new order_entity_1.Order();
        nOrder.order_id = rOrder.order_id;
        nOrder.shipper_id = rOrder.shipper_id;
        nOrder.required_date = new Date(rOrder.required_date);
        nOrder.ship_date = new Date(rOrder.ship_date);
        nOrder.freight = rOrder.freight;
        nOrder.status = rOrder.status;
        nOrder.order_details = orderDetailsEntities;
        try {
            await nOrder.save();
            const fOrder = await order_entity_1.Order.findOne(rOrder.order_id);
            console.log('fOrder: ', fOrder);
            return fOrder;
        }
        catch (error) {
            this.logger.error(`!> Failed to update order: ${JSON.stringify(rOrder)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update order',
                origin: '@order.repository.ts',
                order: rOrder,
            });
        }
    }
    async fetchById(rId) {
        const fOrder = await order_entity_1.Order.findOne({
            relations: ["customer", "shipper", "order_details"],
            where: { address_id: rId },
        });
        console.log("<fetchById| fOrder>", fOrder);
        return fOrder;
    }
    async fetchById0(rId) {
        console.log('OrderRepository rId: ', rId);
        try {
            const fOrder = await order_entity_1.Order.findOne(rId);
            console.log('fOrder: ', fOrder);
            return fOrder;
        }
        catch (error) {
            this.logger.error(`!> Failed to fetch order by id: ${JSON.stringify(rId)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to fetch order',
                origin: '@order.repository.ts',
                order_id: rId,
            });
        }
    }
};
OrderRepository = __decorate([
    typeorm_1.EntityRepository(order_entity_1.Order)
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repository.js.map