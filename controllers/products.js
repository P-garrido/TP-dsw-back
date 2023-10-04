//importar validadores

export class ProductController {
  constructor({ productModel }) {
    this.productModel = productModel;
  }

  getAllProducts = async (req, res) => {
    const products = await this.productModel.getAllProducts();
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).send({ message: 'No products available' });
    }
  };

  getProductById = async (req, res) => {
    const id = req.params;
    const product = await this.productModel.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  };

  deleteProductById = async (req, res) => {
    const id = req.params;
    const product = await this.productModel.deleteProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  };

  createProduct = async (req, res) => {
    const result = req.body;
    const newProduct = await this.productModel.createProduct({ input: result });
    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(400).json({ error: JSON.parse(result.error.message) });
    }
  };

  updateProduct = async (req, res) => {
    const result = req.body;
    const newProduct = await this.productModel.updateProduct({ input: result });
    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(400).json({ message: 'No se pudo actualizar el producto' });
    }
  };
}
