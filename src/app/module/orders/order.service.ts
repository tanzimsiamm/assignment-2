import { OrderModel } from "./order.model";


const createOrder = async (email: string, productId: string, price: number, quantity: number) => {
  const order = new OrderModel({ email, productId, price, quantity });
  await order.save();
  return order;
};

const getAllOrders = async () => {
  return OrderModel.find().populate('productId').exec();
};

const getOrdersByEmail = async (email: string) => {
  return OrderModel.find({ email }).populate('productId').exec();
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};
