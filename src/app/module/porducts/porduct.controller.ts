import { Request, Response } from 'express'
import { ProductServices } from './product.service'
import { z } from 'zod';

//Endpoint: /api/products
//Method: POST
const createProduct = async (req: Request, res: Response) => {
  try{
    const productData = req.body
  const result = await ProductServices.createProduct(productData)
  res.json({
    success: true,
    message: 'Product created successfully !',
    data: result,
  })
  }catch(err){
    console.log(err)
  }
}

//Endpoint: /api/products
//Method: GET
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProducts()

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Could not fetch movies!',
      error: err,
    })
  }
}

//Endpoint: /api/products/:productId
//Method: GET
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getProductById(productId)
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Could not fetch movies!',
      error: err,
    })
  }
};


const deleteProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await ProductServices.deleteProductById(productId);
        
        if (!deletedProduct) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
    
        res.status(200).json({
          success: true,
          message: 'Product deleted successfully!',
          data: null,
        });
      } catch (err:any) {
        res.status(400).json({ success: false, message: err.message });
      }
  };
const getUpdateById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await ProductServices.getUpdateById(productId, req.body);
        res.status(200).json({
          success: true,
          message: 'Product updated successfully!',
          data: updatedProduct,
        });
      } catch (err:any) {
        res.status(400).json({ success: false, message: err.message });
      }
  };
  //search

  const searchByProduct = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm as string | undefined;
        let products;
    
        if (searchTerm) {
          // Search products by term
          products = await ProductServices.searchByProduct(searchTerm);
        } else {
          // Retrieve all products
          products = await ProductServices.getAllProducts();
        }
    
        res.status(200).json({
          success: true,
          message: searchTerm ? `Products matching search term '${searchTerm}' fetched successfully!` : 'Products fetched successfully!',
          data: products,
        });
      } catch (err:any) {
        res.status(400).json({ success: false, message: err.message });
      }
  };





export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  getUpdateById,
  deleteProductById,
  searchByProduct
}
