import { Router } from "express";
import { ServicesController } from "../controllers/services.js";


export const createServiceRouter = ({ servicesModel }) => {
  const servicesRouter = Router();

  const serviceController = new ServicesController({ servicesModel });

  servicesRouter.get("/", serviceController.getAll);
  servicesRouter.get("/:id", serviceController.getById);
  servicesRouter.post("/", serviceController.create);
  servicesRouter.patch("/:id", serviceController.update);
  servicesRouter.delete("/:id", serviceController.delete);

  return servicesRouter;

}