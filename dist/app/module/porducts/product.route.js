"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const porduct_controller_1 = require("./porduct.controller");
const router = express_1.default.Router();
//
router.post('/', porduct_controller_1.productControllers.createProduct);
router.get('/', porduct_controller_1.productControllers.getAllProducts);
router.get('/:productId', porduct_controller_1.productControllers.getProductById);
router.put('/:productId', porduct_controller_1.productControllers.updateProductById);
router.delete('/:productId', porduct_controller_1.productControllers.deleteProductById);
router.get('/search', porduct_controller_1.productControllers.searchByProduct);
exports.productRoutes = router;
