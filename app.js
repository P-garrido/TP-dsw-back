
import express, { json } from 'express';
import { createServiceRouter } from './routes/services.js';
import { corsMiddleware } from './middlewares/cors.js';
import { createUserRouter } from './routes/users.js';
import { createProductRouter } from './routes/products.js';
import { createServicesClientsRouter } from "./routes/services-clients.js";

export const createApp = ({ serviceModel, userModel, productModel, servicesClientsModel }) => {
  const app = express();
  app.use(json());
  app.disable('x-powered-by');
  app.use(corsMiddleware());

  app.use('/services', createServiceRouter({ serviceModel }));
  app.use('/services-clients', createServicesClientsRouter({ servicesClientsModel }));
  app.use('/users', createUserRouter({ userModel }));
  app.use('/products', createProductRouter({ productModel }));


  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
