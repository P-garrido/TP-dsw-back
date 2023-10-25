import { createApp } from './app.js';
import { ServicesModel } from './models/services.js';
import { UserModel } from './models/users.js';
import { OrdersModel } from './models/orders.js';
import { OrderProductsModel } from './models/order-products.js';
import { ProductsModel } from './models/products.js';

createApp({
  servicesModel: ServicesModel,
  userModel: UserModel,
  productModel: ProductsModel,
  orderModel: OrdersModel,
  orderProductsModel: OrderProductsModel,
});
