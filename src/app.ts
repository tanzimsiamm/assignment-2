import express from 'express';
import cors from 'cors'
import { orderRoutes } from './app/module/orders/order.route';
import { productRoutes } from './app/module/porducts/product.route';

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
