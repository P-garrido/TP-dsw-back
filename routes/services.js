import { Router } from 'express';
import { ServicesController } from '../controllers/services.js';
import { validateToken } from '../middlewares/token.js';

export const createServiceRouter = ({ serviceModel }) => {
  const servicesRouter = Router();

  const serviceController = new ServicesController({ serviceModel });

  servicesRouter.get('/', serviceController.getAll);
  servicesRouter.get('/:id', serviceController.getById);
  servicesRouter.post('/', validateToken, serviceController.create);
  servicesRouter.patch('/:id', validateToken, serviceController.update);
  servicesRouter.delete('/:id', validateToken, serviceController.delete);

  return servicesRouter;
};
