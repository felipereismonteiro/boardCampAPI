import { Router } from "express";
import customersGetController from "../controllers/customersGetController.js";
import customersGetIdController from "../controllers/customersGetIdController.js";
import customersPostController from "../controllers/customersPostController.js";
import customersMiddleware from "../middlewares/customersMiddleware.js";

export const customersRoute = Router();

customersRoute.get("/customers", customersGetController);
customersRoute.get("/customers/:id", customersGetIdController);
customersRoute.post("/customers", customersMiddleware, customersPostController);