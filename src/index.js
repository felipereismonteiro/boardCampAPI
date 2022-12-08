import express from "express";
import cors from "cors";
import { categoriesRoute } from "./routes/categoriesRoute.js";
import { gameRoute } from "./routes/gamesRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRoute);
app.use(gameRoute);

const port = process.env.port || 4000;
app.listen(port, () => console.log(`server running on port: ${port}`));
