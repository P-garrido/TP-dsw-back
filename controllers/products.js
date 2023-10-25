//importar validadores

export class ProductController {
  constructor({ productModel }) {
    this.productModel = productModel;
  }

  getAllProducts = async (req, res) => {
    // const products = await this.productModel.getAllProducts();
    // if (products.length > 0) {
    //   res.json(products);
    // } else {
    //   res.status(404).send({ message: 'No products available' });
    // }
    const products = await this.productModel.findAll();
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).send({ message: 'No products available' });
    }
  };

  getProductById = async (req, res) => {
    // const id = req.params;
    // const product = await this.productModel.getProductById(id);
    // if (product) {
    //   res.json(product);
    // } else {
    //   res.status(404).send({ message: 'Product not found' });
    // }
    const id = req.params;
    const product = await this.productModel.findOne({
      where: { id_producto: id },
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  };

  deleteProductById = async (req, res) => {
    // const id = req.params;
    // const product = await this.productModel.deleteProductById(id);
    // if (product) {
    //   res.json(product);
    // } else {
    //   res.status(404).send({ message: 'Product not found' });
    // }
    const id = req.params.id;
    const product = await this.productModel.findOne({
      where: { id_producto: id },
    });
    await this.productModel.destroy({
      where: { id_producto: id },
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  };

  createProduct = async (req, res) => {
    // const result = req.body;
    // const newProduct = await this.productModel.createProduct({ input: result });
    // if (newProduct) {
    //   res.status(201).json(newProduct);
    // } else {
    //   res.status(400).json({ error: JSON.parse(result.error.message) });
    // }
    const { nombre_producto, desc_producto, stock, precio, imagen } = req.body;
    const newProduct = await this.productModel.create({
      nombre_producto,
      desc_producto,
      stock,
      precio,
      imagen,
    });
    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(400).json({ message: 'No se pudo crear el producto' });
    }
  };

  updateProduct = async (req, res) => {
    // const result = req.body;
    // const newProduct = await this.productModel.updateProduct({ input: result });
    // if (newProduct) {
    //   res.status(201).json(newProduct);
    // } else {
    //   res.status(400).json({ message: 'No se pudo actualizar el producto' });
    // }
    const {
      id_producto,
      nombre_producto,
      desc_producto,
      stock,
      precio,
      imagen,
    } = req.body;
    const newProduct = await this.productModel.findOne({
      where: { id_producto: id_producto },
    });
    newProduct.set({
      nombre_producto: nombre_producto,
      desc_producto: desc_producto,
      stock: stock,
      precio: precio,
      imagen: imagen,
    });
    await newProduct.save();
    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(400).json({ message: 'No se pudo actualizar el producto' });
    }
  };
}
