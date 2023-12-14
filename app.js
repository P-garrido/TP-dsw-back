import express, { json } from 'express';
import { createServiceRouter } from './routes/services.js';
import { corsMiddleware } from './middlewares/cors.js';
import { createUserRouter } from './routes/users.js';
import { createProductRouter } from './routes/products.js';
import { createOrderRouter } from './routes/orders.js';
import { createOrderProductsRouter } from './routes/order-products.js';
import { createServicesClientsRouter } from './routes/services-clients.js';
import { createLoginRouter } from './routes/login.js';
import { BranchesRouter } from './routes/branches.js';
import { createImagesRouter } from './routes/images.js';
import multer from 'multer';

export const createApp = ({
  serviceModel,
  userModel,
  productModel,
  orderModel,
  orderProductsModel,
  servicesClientsModel,
  branchModel,
}) => {
  const app = express();
  app.use(json());
  app.disable('x-powered-by');
  app.use(corsMiddleware());

  app.use('/login', createLoginRouter({ userModel }));

  app.use('/services', createServiceRouter({ serviceModel }));
  app.use(
    '/services-clients',
    createServicesClientsRouter({ servicesClientsModel })
  );
  app.use('/users', createUserRouter({ userModel }));
  app.use('/products', createProductRouter({ productModel }));
  app.use('/orders', createOrderRouter({ orderModel }));
  app.use('/order/products', createOrderProductsRouter({ orderProductsModel }));
  app.use('/branches', BranchesRouter({ branchModel }));
  app.use('/images', createImagesRouter());
  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
