import express, { json } from 'express';
import { createServiceRouter } from './routes/services.js';
import { corsMiddleware } from './middlewares/cors.js';
import { createUserRouter } from './routes/users.js';
import { createProductRouter } from './routes/products.js';
import { createOrderRouter } from './routes/orders.js';
import { createOrderProductsRouter } from './routes/order-products.js';

export const createApp = ({
  servicesModel,
  userModel,
  productModel,
  orderModel,
  orderProductsModel
}) => {
  const app = express();
  app.use(json());
  app.disable('x-powered-by');
  app.use(corsMiddleware());

  app.use('/services', createServiceRouter({ servicesModel }));
  app.use('/users', createUserRouter({ userModel }));
  app.use('/products', createProductRouter({ productModel }));
  app.use('/orders', createOrderRouter({ orderModel }));
  app.use('/order/products', createOrderProductsRouter({orderProductsModel}))

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
