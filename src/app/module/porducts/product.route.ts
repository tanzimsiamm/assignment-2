import express, { Request, Response } from "express";
import { Product } from "./product.model";


const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const result = await Product.create(req.body)
    res.json({
      success: true,
      message: "Product created successfully !",
      data: result,
    });
  } catch (err) {
    console.log(err)
  }

});


export const productRoutes = router;