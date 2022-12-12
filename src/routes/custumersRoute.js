import { Router } from "express";
import { customersPostController, customersPutController } from "../controllers/customersPostController.js";
import { customersMiddleware, customersPutMiddleware} from "../middlewares/customersMiddleware.js";
import customersGetController from "../controllers/customersGetController.js";
import customersGetIdController from "../controllers/customersGetIdController.js";


export const customersRoute = Router();

customersRoute.get("/customers", customersGetController);
customersRoute.get("/customers/:id", customersGetIdController);
customersRoute.post("/customers", customersMiddleware, customersPostController);
customersRoute.put("/customers/:id", customersPutMiddleware, customersPutController);
