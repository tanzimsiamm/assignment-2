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
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../porducts/product.model");
//
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
//
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield product_model_1.Product.findById(this.productId);
        if (!result) {
            throw new Error('Product not found by this productId');
        }
        const { inventory: { quantity }, } = yield product_model_1.Product.findById(this.productId);
        if (quantity < this.quantity) {
            throw new Error('Quantity available in inventory');
        }
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(this.productId, {
            $inc: {
                'inventory.quantity': -this.quantity,
            },
        }, { new: true });
        if ((updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.inventory.quantity) === 0) {
            yield product_model_1.Product.findByIdAndUpdate(this.productId, {
                $set: {
                    'inventory.inStock': false,
                },
            });
        }
        next();
    });
});
// export orderModel as a model
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
