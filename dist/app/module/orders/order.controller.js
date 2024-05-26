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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
// createOrder to get by /api/orders using post method
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = order_validation_1.createOrderSchema.safeParse(req.body);
        if (!validation.success) {
            return res
                .status(400)
                .json({
                success: false,
                message: validation.error.errors.map(e => e.message).join(', '),
            });
        }
        const { email, productId, price, quantity } = validation.data;
        const order = yield order_service_1.OrderServices.createOrder(email, productId, price, quantity);
        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: order,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
// getAllOrder to get by /api/orders using get method
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.OrderServices.getAllOrders();
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: orders,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
// getOrdersByEmail to get by /api/orders?email=level2@programming-hero.com using get method
const getOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const validation = order_validation_1.createOrderSchema.shape.email.safeParse(email);
        if (!validation.success) {
            return res
                .status(400)
                .json({
                success: false,
                message: validation.error.errors.map(e => e.message).join(', '),
            });
        }
        const orders = yield order_service_1.OrderServices.getOrdersByEmail(email);
        res.status(200).json({
            success: true,
            message: `Orders fetched successfully for user email ${email}!`,
            data: orders,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
// export them for use
exports.orderController = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
