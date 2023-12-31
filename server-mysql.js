import { createApp } from './app.js';
import { serviceModel } from './models/services.js';

import { userModel } from './models/users.js';
import { OrdersModel } from './models/orders.js';
import { ProductsModel } from './models/products.js';
import { OrderProduct } from './models/order-products.js';
// import { ProductModel } from './models/products.js';
import { servicesClientsModel } from './models/services-clients.js';
import { branchModel } from "./models/branches.js";


createApp({
  serviceModel,
  userModel: userModel,
  productModel: ProductsModel,
  orderModel: OrdersModel,
  orderProductsModel: OrderProduct,
  servicesClientsModel,
  branchModel
});
