
import { createApp } from './app.js';
import { serviceModel } from './models/services.js';
import { userModel } from './models/users.js';
import { ProductModel } from './models/products.js';
import { servicesClientsModel } from "./models/services-clients.js";

createApp({
  serviceModel,
  userModel: userModel,
  productModel: ProductModel,
  servicesClientsModel
});