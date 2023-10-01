import { createApp } from "./app.js";
import { ServicesClientsModel } from "./models/services-clients.js";
import { ServicesModel } from "./models/services.js";
import { UserModel } from "./models/users.js"

createApp({ servicesModel: ServicesModel, servicesClientsModel: ServicesClientsModel, userModel: UserModel });