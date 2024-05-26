"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const order_route_1 = require("./app/module/orders/order.route");
const product_route_1 = require("./app/module/porducts/product.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/orders', order_route_1.orderRoutes);
app.use('/api/products', product_route_1.productRoutes);
app.get("/", (req, res) => {
    res.send("hello! i am live on vercel. yahoo!!!");
});
exports.default = app;
