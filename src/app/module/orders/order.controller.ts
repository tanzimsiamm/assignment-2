import { Request, Response } from 'express';
import { OrderServices } from './order.service';

   const createOrder=async(req: Request, res: Response) =>{
    try {
      const { email, productId, price, quantity } = req.body;
      const order = await OrderServices.createOrder(email, productId, price, quantity);
      res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: order,
      });
    } catch (err:any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

   const getAllOrders= async(req: Request, res: Response)=> {
    try {
      const orders = await OrderServices.getAllOrders();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: orders,
      });
    } catch (err:any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

   const getOrdersByEmail = async(req: Request, res: Response) =>{
    try {
      const { email } = req.params;
      const orders = await OrderServices.getOrdersByEmail(email);
      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for user email ${email}!`,
        data: orders,
      });
    } catch (err:any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }


export const orderController = {
    createOrder,
    getAllOrders,
    getOrdersByEmail
};
