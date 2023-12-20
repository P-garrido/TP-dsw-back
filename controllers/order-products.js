export class OrderProductsController {
  constructor({ orderProductsModel }) {
    this.orderProductsModel = orderProductsModel;
  }

  createOrderProduct = async (req, res) => {
    const { id_pedido, id_producto, cantidad } = req.body;
    try {
      const newOrderProductTuple = await this.orderProductsModel.create({
        id_pedido,
        id_producto,
        cantidad,
      });
      if (newOrderProductTuple) {
        res.status(201).json(newOrderProductTuple);
      } else {
        res.status(400).json({ message: 'No se pudo crear la tupla' });
      }
    } catch (error) {
      res.status(400).json({ error: 'error creando el pedido' });
    }
  };
}
