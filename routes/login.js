import { Router } from "express";
import { UserController } from "../controllers/users.js";

export const createLoginRouter = ({ userModel }) => {
  const loginRouter = Router()

  const userController = new UserController({ userModel })

  loginRouter.post('/', userController.loginUser)

  return loginRouter
}