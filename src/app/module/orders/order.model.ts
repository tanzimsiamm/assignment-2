import { Schema, model, Document } from 'mongoose'
import { IOrder } from './order.interface'
import { Product } from '../porducts/product.model'

//
const orderSchema = new Schema<IOrder>({
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
})

//
orderSchema.pre('save', async function (next) {
  const result = await Product.findById(this.productId)
  if (!result) {
    throw new Error('Product not found by this productId')
  }

  const {
    inventory: { quantity },
  }: any = await Product.findById(this.productId)

  if (quantity < this.quantity) {
    throw new Error('Quantity available in inventory')
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    this.productId,
    {
      $inc: {
        'inventory.quantity': -this.quantity,
      },
    },
    { new: true },
  )

  if (updatedProduct?.inventory.quantity === 0) {
    await Product.findByIdAndUpdate(this.productId, {
      $set: {
        'inventory.inStock': false,
      },
    })
  }

  next()
})

// export orderModel as a model
export const OrderModel = model<IOrder>('Order', orderSchema)
