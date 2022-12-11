import { Router } from "express";
import rentalsdDeleteController from "../controllers/rentalsDeleteController.js";
import rentalsGetController from "../controllers/rentalsGetController.js";
import rentalsPostController from "../controllers/rentalsPostController.js";
import { rentalDeleteMiddleware, rentalMiddleware } from "../middlewares/rentalMiddleware.js";

export const rentalsRoute = Router();

rentalsRoute.get("/rentals", rentalsGetController);
rentalsRoute.post("/rentals", rentalMiddleware, rentalsPostController);

rentalsRoute.delete("/rentals/:id", rentalDeleteMiddleware, rentalsdDeleteController);