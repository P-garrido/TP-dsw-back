
import { createApp } from './app.js';
import { serviceModel } from './models/services.js';
import { UserModel } from './models/users.js';
import { ProductModel } from './models/products.js';
import { ServicesClientsModel } from "./models/services-clients.js";

createApp({
  serviceModel,
  userModel: UserModel,
  productModel: ProductModel,
  servicesClientsModel: ServicesClientsModel
});