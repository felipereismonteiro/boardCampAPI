import { Router } from "express";
import rentalReturnController from "../controllers/rentalReturnController.js";
import rentalsdDeleteController from "../controllers/rentalsDeleteController.js";
import rentalsGetController from "../controllers/rentalsGetController.js";
import rentalsPostController from "../controllers/rentalsPostController.js";
import { rentalReturnMiddleware, rentalDeleteMiddleware, rentalMiddleware } from "../middlewares/rentalMiddleware.js";

export const rentalsRoute = Router();

rentalsRoute.get("/rentals", rentalsGetController);
rentalsRoute.post("/rentals", rentalMiddleware, rentalsPostController);

rentalsRoute.post("/rentals/:id/return", rentalReturnMiddleware, rentalReturnController);
rentalsRoute.delete("/rentals/:id", rentalDeleteMiddleware, rentalsdDeleteController);