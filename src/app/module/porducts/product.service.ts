import { TProduct } from './product.interface'
import { Product } from './product.model'

//
const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload)
  return result
}

//
const getAllProducts = async () => {
  const result = await Product.find()
  return result
}

//
const getProductById = async (productId: string) => {
  const result = await Product.findById(productId)
  return result
}

//
const updateProductById = async (id: string, updateData: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true },
  )
  return result
}

//
const deleteProductById = async (productId: string) => {
  const deletedProduct = await Product.findByIdAndDelete(productId)
  return deletedProduct
}

//
const searchByProduct = async (searchTerm: string) => {
  const products = await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
    ],
  })
  return products
}

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchByProduct,
}
