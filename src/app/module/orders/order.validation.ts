import { z } from "zod";

export const createOrderSchema = z.object({
  email: z
    .string()
    .email("please provide a valid email")
    .min(1, "email is required"),

  productId: z.string().min(1, "productId is required"),

  price: z.number().min(1, "price is required"),

  quantity: z.number().min(1, "quantity is required")
});