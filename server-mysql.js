import { createApp } from "./app.js";
import { ServicesModel } from "./models/services.js";
import { UserModel } from "./models/users.js";

createApp({ servicesModel: ServicesModel, userModel: UserModel });