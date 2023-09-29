import express, { json } from "express";
import { createServiceRouter } from "./routes/services.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { createUserRouter } from "./routes/users.js";

export const createApp = ({ servicesModel }) => {
  const app = express();
  app.use(json());
  app.disable("x-powered-by");
  app.use(corsMiddleware());

  app.use('/services', createServiceRouter({ servicesModel }));
  app.use('/users', createUserRouter({ userModel }))

  const PORT = process.env.PORT ?? 1234;


  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);

  })
}