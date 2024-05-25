import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { createOrderSchema } from './order.validation';

// createOrder to get by /api/orders using post method
const createOrder = async (req: Request, res: Response) => {
  try {
    const validation = createOrderSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, message: validation.error.errors.map(e => e.message).join(', ') });
    }

    const { email, productId, price, quantity } = validation.data;

    const order = await OrderServices.createOrder(email, productId, price, quantity);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// getAllOrder to get by /api/orders using get method
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderServices.getAllOrders();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// getOrdersByEmail to get by /api/orders?email=level2@programming-hero.com using get method
const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const validation = createOrderSchema.shape.email.safeParse(email);
    if (!validation.success) {
      return res.status(400).json({ success: false, message: validation.error.errors.map(e => e.message).join(', ') });
    }

    const orders = await OrderServices.getOrdersByEmail(email as string);
    res.status(200).json({
      success: true,
      message: `Orders fetched successfully for user email ${email}!`,
      data: orders,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// export them for use
export const orderController = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};
