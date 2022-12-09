import { Router } from "express";
import customersGetController from "../controllers/customersGetController.js";
export const customersRoute = Router();

customersRoute.get("/customers", customersGetController);