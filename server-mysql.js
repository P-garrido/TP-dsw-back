import { createApp } from "./app.js";
import { ServicesClientsModel } from "./models/services-clients.js";
import { ServicesModel } from "./models/services.js";

createApp({ servicesModel: ServicesModel, servicesClientsModel: ServicesClientsModel });