import express from "express";
import cors from "cors";
import { categoriesRoute } from "./routes/categoriesRoute.js";
import { gameRoute } from "./routes/gamesRoute.js";
import { customersRoute } from "./routes/custumersRoute.js";
import { rentalsRoute } from "./routes/rentalsRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRoute);
app.use(gameRoute);
app.use(customersRoute);
app.use(rentalsRoute);

const port = process.env.port || 4000;
app.listen(port, () => console.log(`server running on port: ${port}`));
