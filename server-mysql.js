import { createApp } from './app.js';
import { serviceModel } from './models/services.js';
import { UserModel } from './models/users.js';
import { OrdersModel } from './models/orders.js';
import { OrderProductsModel } from './models/order-products.js';
import { ProductsModel } from './models/products.js';
// import { ProductModel } from './models/products.js';
import { servicesClientsModel } from './models/services-clients.js';

createApp({
  serviceModel,
  userModel: UserModel,
  productModel: ProductsModel,
  orderModel: OrdersModel,
  orderProductsModel: OrderProductsModel,
  servicesClientsModel,
});
