import express from "express";
import { productControllers } from "./porduct.controller";


const router = express.Router();

router.post("/", productControllers.createProduct);
router.get("/", productControllers.getAllProducts);
router.get("/:productId", productControllers.getProductById)
router.put("/:productId", productControllers.getProductById)
router.delete("/:productId", productControllers.deleteProductById)
router.get("/", productControllers.searchByProduct)

export const productRoutes = router;