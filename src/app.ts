import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { orderRoutes } from './app/module/orders/order.route'
import { productRoutes } from './app/module/porducts/product.route'

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/orders', orderRoutes)
app.use('/api/products', productRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("hello!");
});

export default app;