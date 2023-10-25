export class OrderProductsController {
  constructor({ orderProductsModel }) {
    this.orderProductsModel = orderProductsModel;
  }

  createOrderProduct = async (req, res) => {
    const result = req.body;
    const newOrderProductTuple =
      await this.orderProductsModel.createOrderProductTuple({ input: result });
    if (newOrderProductTuple) {
      res.status(201).json(newOrderProductTuple);
    } else {
      res.status(400).json({ message: 'No se pudo crear la tupla' });
    }
  };
}
