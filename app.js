import express, { json } from 'express';
import { createServiceRouter } from './routes/services.js';



export const createApp = ({
  serviceModel,

}) => {
  const app = express();
  app.use(json());





  app.use('/services', createServiceRouter({ serviceModel }));


  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
