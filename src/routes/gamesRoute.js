import { Router } from "express";
import gameMiddleware from "../middlewares/gameMiddleware.js";
import gamePostController from "../controllers/gamePostController.js";
import gamesGetController from "../controllers/gamesGetController.js";

export const gameRoute = Router();

gameRoute.get("/games", gamesGetController);
gameRoute.post("/games", gameMiddleware, gamePostController);