import { Router } from "express";
import { ServicesClientsController } from "../controllers/services-clients.js";
import { validateToken } from "../middlewares/token.js";

export const createServicesClientsRouter = ({ servicesClientsModel }) => {
  const servicesClientsRouter = Router();
  const servicesClientsController = new ServicesClientsController({ servicesClientsModel });

  servicesClientsRouter.get("/", validateToken, servicesClientsController.getAll);
  servicesClientsRouter.get("/:idServ/:idCli/:date", validateToken, servicesClientsController.getById);
  servicesClientsRouter.post("/", validateToken, servicesClientsController.create);
  servicesClientsRouter.delete("/:idServ/:idCli/:date", validateToken, servicesClientsController.delete);
  servicesClientsRouter.patch("/:idServ/:idCli/:date", validateToken, servicesClientsController.update);

  return servicesClientsRouter;
}