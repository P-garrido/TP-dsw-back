import { Router } from "express";
import { BranchesController } from "../controllers/branches.js";


export const BranchesRouter = ({ branchModel }) => {
  const router = Router();
  const controller = new BranchesController({ branchModel });

  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.patch("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
}