import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { productRoutes } from './app/module/porducts/product.route';

const app: Application = express()

// parser
app.use(express.json());

app.use("/api/products", productRoutes)
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello man!')
})

export default app
