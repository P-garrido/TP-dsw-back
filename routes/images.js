import { Router } from 'express';
import { ImageController } from '../controllers/images.js';
import { multerU } from '../middlewares/multer.js';
export const createImagesRouter = () => {
  const imgRouter = Router();

  const imgController = new ImageController();

  imgRouter.get('/:id', imgController.getOneImage);
  imgRouter.post('/upload', multerU, imgController.uploadImg);
  return imgRouter;
};
