import { Router } from "express";
import categoriesMiddleware from "../middlewares/categoriesMiddleware.js";

import categoriesPostController from "../controllers/categoriesPostController.js";
import categoriesGetController from "../controllers/categoriesGetController.js";
export const categoriesRoute = Router();

categoriesRoute.get("/categories", categoriesGetController);
categoriesRoute.post("/categories", categoriesMiddleware, categoriesPostController);
