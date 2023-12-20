import { Router } from 'express';
import { ProductController } from '../controllers/products.js';
import { validateToken } from '../middlewares/token.js';

export const createProductRouter = ({ productModel }) => {
  const productRouter = Router();

  const productController = new ProductController({ productModel });

  productRouter.get('/', productController.getAllProducts);
  productRouter.get('/:id', productController.getProductById);

  productRouter.post('/get_products', productController.getProductsByIds);
  productRouter.get(
    '/nombre_producto/:name_prod',
    productController.getProductByName
  );
  productRouter.get(
    '/desc_producto/:desc',
    productController.getProductByDescription
  );
  productRouter.patch(
    '/:id',
    validateToken,
    productController.updateProductStock
  );
  productRouter.delete(
    '/:id',
    validateToken,
    productController.deleteProductById
  );
  productRouter.post('/', validateToken, productController.createProduct);
  productRouter.patch('/', validateToken, productController.updateProduct);
  return productRouter;
};
