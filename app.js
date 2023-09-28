import express, { json }  from "express";
import { createUserRouter } from "./routes/users.js";

export const createApp = ({ userModel }) => {
  const app = express()
  app.use(json())

  app.use('/users', createUserRouter({ userModel }))

  const PORT = 3000

  app.listen(PORT, () => {
    console.log('server listening on port http://localhost:3000')
  })
}