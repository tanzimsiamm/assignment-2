import { Product } from '../porducts/product.model'
import { OrderModel } from './order.model'

//
const createOrder = async (
  email: string,
  productId: string,
  price: number,
  quantity: number,
) => {
  // Check product availability
  const product = await Product.findById(productId)
  if (!product) {
    throw new Error('Product not found by this productId')
  }

  if (product.inventory.quantity < quantity) {
    throw new Error('Insufficient quantity available in inventory')
  }

  // Update inventory
  product.inventory.quantity -= quantity
  if (product.inventory.quantity === 0) {
    product.inventory.inStock = false
  }
  await product.save()
  const order = new OrderModel({ email, productId, price, quantity })
  await order.save()
  return order
}

//
const getAllOrders = async () => {
  return OrderModel.find().populate('productId').exec()
}

//
const getOrdersByEmail = async (email: string) => {
  return OrderModel.find({ email }).populate('productId').exec()
}

//
export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
}
