import { Router } from "express";
import { ServicesClientsController } from "../controllers/services-clients.js";

export const createServicesClientsRouter = ({ servicesClientsModel }) => {
  const servicesClientsRouter = Router();
  const servicesClientsController = new ServicesClientsController({ servicesClientsModel });

  servicesClientsRouter.get("/", servicesClientsController.getAll);
  servicesClientsRouter.get("/:idServ/:idCli", servicesClientsController.getById);
  servicesClientsRouter.post("/", servicesClientsController.create);
  servicesClientsRouter.delete("/:idServ/:idCli", servicesClientsController.delete);
  servicesClientsRouter.patch("/:idServ/:idCli", servicesClientsController.update);

  return servicesClientsRouter;
}