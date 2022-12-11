import { Router } from "express";
import rentalsGetController from "../controllers/rentalsGetController.js";
import rentalsPostController from "../controllers/rentalsPostController.js";
import rentalMiddleware from "../middlewares/rentalMiddleware.js";
export const rentalsRoute = Router();

rentalsRoute.get("/rentals", rentalsGetController);
rentalsRoute.post("/rentals", rentalMiddleware, rentalsPostController);