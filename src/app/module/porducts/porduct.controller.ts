import { Request, Response } from 'express'
import { z } from 'zod'
import { productSchema } from './product.validation'
import { ProductServices } from './product.service'

//createProduct to get /api/products using post method
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = productSchema.parse(req.body)
    const result = await ProductServices.createProduct(productData)
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, message: err.errors })
    } else {
      res.status(400).json({ success: false, message: err.message })
    }
  }
}

// getallProducts to get /api/products using get method
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
      message: 'Could not fetch products!',
      error: err,
    })
  }
}

// getProductbyId to get /api/products/:productId using get method
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getProductById(productId)
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Could not fetch product!',
      error: err,
    })
  }
}

// updateProductById to get /api/products/:productId using put method
const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const updateData = productSchema.partial().parse(req.body)
    const updatedProduct = await ProductServices.updateProductById(
      productId,
      updateData,
    )
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
    })
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, message: err.errors })
    } else {
      res.status(400).json({ success: false, message: err.message })
    }
  }
}

// deleteProductByid for delete by /api/products/:productId using delete method
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const deletedProduct = await ProductServices.deleteProductById(productId)
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' })
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

// searchByProduct to search by /api/products?searchTerm=iphone using get method
const searchByProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined
    let products

    if (searchTerm) {
      products = await ProductServices.searchByProduct(searchTerm)
    } else {
      products = await ProductServices.getAllProducts()
    }

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
      data: products,
    })
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}

//export to use them
export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchByProduct,
}
