import { z } from 'zod'

// used zod for validation

const variantSchema = z.object({
  type: z.string(),
  value: z.string(),
})

const inventorySchema = z.object({
  quantity: z.number().nonnegative(),
  inStock: z.boolean(),
})

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantSchema),
  inventory: inventorySchema,
})

export { productSchema }
