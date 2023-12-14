import { OrderProduct } from '../models/order-products.js';
import { userModel } from '../models/users.js';

export class OrdersController {
  constructor({ orderModel }) {
    this.orderModel = orderModel;
  }

  createOrder = async (req, res) => {
    const { id_cliente, total } = req.body;
    const newOrder = await this.orderModel.create({
      id_cliente,
      total,
    });
    if (newOrder) {
      res.status(201).json(newOrder);
    } else {
      res.status(400).json({ message: 'No se pudo crear el pedido' });
    }
  };
  getAll = async (req, res) => {
    const orders = await this.orderModel.findAll({
      include: [
        {
          model: OrderProduct,
          attributes: ['id_producto', 'cantidad'],
        },
        { model: userModel },
      ],
    });

    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).send({ message: 'No orders available' });
    }
  };
}
