"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
// used zod for validation
const variantSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().nonnegative(),
    inStock: zod_1.z.boolean(),
});
const productSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().nonnegative(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(variantSchema),
    inventory: inventorySchema,
});
exports.productSchema = productSchema;
