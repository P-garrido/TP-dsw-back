import { Router } from "express";
import { UserController } from "../controllers/users.js";

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()

  const userController = new UserController({ userModel })

  userRouter.get('/', userController.getAllUsers)
  userRouter.get('/:id', userController.getUserById)
  userRouter.delete('/:id', userController.deleteUserById)
  userRouter.post('/', userController.createUser)
  userRouter.patch('/:id', userController.modifyUser)

  return userRouter
}