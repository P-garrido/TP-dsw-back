import express, { Router } from 'express';
import { OrdersController } from '../controllers/orders.js';

export const createOrderRouter = ({ orderModel }) => {
  const ordersRouter = Router();

  const ordersController = new OrdersController({ orderModel });

  ordersRouter.post('/', ordersController.createOrder);
  ordersRouter.get('/', ordersController.getAll);

  return ordersRouter;
};
