import { Router } from "express";
import { ServicesController } from "../controllers/services.js";


export const createServiceRouter = ({ serviceModel }) => {
  const servicesRouter = Router();

  const serviceController = new ServicesController({ serviceModel });

  servicesRouter.get("/", serviceController.getAll);
  servicesRouter.get("/:id", serviceController.getById);
  servicesRouter.post("/", serviceController.create);
  servicesRouter.patch("/:id", serviceController.update);
  servicesRouter.delete("/:id", serviceController.delete);

  return servicesRouter;

}