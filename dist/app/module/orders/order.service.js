"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../porducts/product.model");
const order_model_1 = require("./order.model");
//
const createOrder = (email, productId, price, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    // Check product availability
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new Error('Product not found by this productId');
    }
    if (product.inventory.quantity < quantity) {
        throw new Error('Insufficient quantity available in inventory');
    }
    // Update inventory
    product.inventory.quantity -= quantity;
    if (product.inventory.quantity === 0) {
        product.inventory.inStock = false;
    }
    yield product.save();
    const order = new order_model_1.OrderModel({ email, productId, price, quantity });
    yield order.save();
    return order;
});
//
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.OrderModel.find().populate('productId').exec();
});
//
const getOrdersByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.OrderModel.find({ email }).populate('productId').exec();
});
//
exports.OrderServices = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
