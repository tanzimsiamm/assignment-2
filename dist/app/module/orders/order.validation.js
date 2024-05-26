"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('please provide a valid email')
        .min(1, 'email is required'),
    productId: zod_1.z.string().min(1, 'productId is required'),
    price: zod_1.z.number().min(1, 'price is required'),
    quantity: zod_1.z.number().min(1, 'quantity is required'),
});
