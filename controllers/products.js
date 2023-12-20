//importar validadores
import { Op } from 'sequelize';
import {
  validatePartialProduct,
  validateProduct,
} from '../schemas/products.js';

export class ProductController {
  constructor({ productModel }) {
    this.productModel = productModel;
  }

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productModel.findAll();
      if (products.length > 0) {
        res.json(products);
      } else {
        res.status(404).send({ message: 'No products available' });
      }
    } catch (error) {
      res.status(400).json({ error: 'error buscando el producto' });
    }
  };

  getProductsByIds = async (req, res) => {
    const products = req.body.products;
    const productsSearched = [];
    try {
      for (let product of products) {
        const searchedProduct = await this.productModel.findOne({
          where: { id_producto: product.id_producto },
        });
        productsSearched.push(searchedProduct);
      }
      if (productsSearched.length > 0) {
        res.json(productsSearched);
      } else {
        res.status(404).send({ message: 'Products not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'error buscando el producto' });
    }
  };

  getProductById = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await this.productModel.findOne({
        where: { id_producto: id },
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).send({ message: 'Products not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'error buscando el producto' });
    }
  };

  getProductByName = async (req, res) => {
    const name_prod = req.params.name_prod;
    try {
      const product = await this.productModel.findOne({
        where: { nombre_producto: name_prod },
      });
      if (product != null) {
        res.json(product);
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'error buscaando el producto' });
    }
  };

  getProductByDescription = async (req, res) => {
    const desc_prod = req.params.desc;
    try {
      const product = await this.productModel.findAll({
        where: {
          nombre_producto: {
            [Op.like]: `%${desc_prod}%`,
          },
        },
      });
      if (product != null) {
        res.json(product);
      } else {
        res.status(404).send({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'error buscnaod el producto' });
    }
  };

  deleteProductById = async (req, res) => {
    const id = req.params.id;
    try {
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
    } catch (error) {
      res.status(400).json({ error: 'error borrando el producto' });
    }
  };

  createProduct = async (req, res) => {
    const result = validateProduct({
      nombre_producto: req.body.nombre_producto,
      desc_producto: req.body.desc_producto,
      stock: parseInt(req.body.stock),
      precio: parseInt(req.body.precio),
    });
    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }
    try {
      const { nombre_producto, desc_producto, stock, precio, imagen } =
        req.body;
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
    } catch (error) {
      res.status(400).json({ error: 'error creando el servicio' });
    }
  };

  updateProduct = async (req, res) => {
    const {
      id_producto,
      nombre_producto,
      desc_producto,
      stock,
      precio,
      imagen,
    } = req.body;
    try {
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
    } catch (error) {
      res.status(400).json({ error: 'error creando el servicio' });
    }
  };

  updateProductStock = async (req, res) => {
    const id_producto = req.params.id;
    const { cantidad } = req.body;
    const stockProd = await this.productModel.findOne({
      where: { id_producto: id_producto },
    });
    const updatedProduct = await this.productModel.update(
      { stock: stockProd.stock - cantidad },
      { where: { id_producto: id_producto } }
    );
    const newProduct = await this.productModel.findOne({
      where: { id_producto: id_producto },
    });
    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      res.status(400).json({ message: 'No se pudo actualizar el stock' });
    }
  };
  uploadImg = async (filename, id) => {
    const imgPath = new URL(`../public/uploads/${filename}`, import.meta.url)
      .pathname;
    await this.productModel.update(
      { imagen: imgPath },
      { where: { id_producto: id } }
    );
  };
}
