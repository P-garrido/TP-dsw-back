
import { createApp } from './app.js';
import { ServicesModel } from './models/services.js';
import { UserModel } from './models/users.js';
import { ProductModel } from './models/products.js';
import { ServicesClientsModel } from "./models/services-clients.js";

createApp({
  servicesModel: ServicesModel,
  userModel: UserModel,
  productModel: ProductModel,
  servicesClientsModel: ServicesClientsModel
});