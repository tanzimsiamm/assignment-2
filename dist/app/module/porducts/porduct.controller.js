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
exports.productControllers = void 0;
const zod_1 = require("zod");
const product_validation_1 = require("./product.validation");
const product_service_1 = require("./product.service");
//createProduct to get /api/products using post method
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = product_validation_1.productSchema.parse(req.body);
        const result = yield product_service_1.ProductServices.createProduct(productData);
        res.status(201).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({ success: false, message: err.errors });
        }
        else {
            res.status(400).json({ success: false, message: err.message });
        }
    }
});
// getallProducts to get /api/products using get method
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.getAllProducts();
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Could not fetch products!',
            error: err,
        });
    }
});
// getProductbyId to get /api/products/:productId using get method
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getProductById(productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Could not fetch product!',
            error: err,
        });
    }
});
// updateProductById to get /api/products/:productId using put method
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = product_validation_1.productSchema.partial().parse(req.body);
        const updatedProduct = yield product_service_1.ProductServices.updateProductById(productId, updateData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: updatedProduct,
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            res.status(400).json({ success: false, message: err.errors });
        }
        else {
            res.status(400).json({ success: false, message: err.message });
        }
    }
});
// deleteProductByid for delete by /api/products/:productId using delete method
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const deletedProduct = yield product_service_1.ProductServices.deleteProductById(productId);
        if (!deletedProduct) {
            return res
                .status(404)
                .json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
// searchByProduct to search by /api/products?searchTerm=iphone using get method
const searchByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        let products;
        if (searchTerm) {
            products = yield product_service_1.ProductServices.searchByProduct(searchTerm);
        }
        else {
            products = yield product_service_1.ProductServices.getAllProducts();
        }
        res.status(200).json({
            success: true,
            message: searchTerm
                ? `Products matching search term '${searchTerm}' fetched successfully!`
                : 'Products fetched successfully!',
            data: products,
        });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
//export to use them
exports.productControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    searchByProduct,
};
