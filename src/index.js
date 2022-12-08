import express from "express";
import cors from "cors";
import { categoriesRoute } from "../routes/categoriesRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRoute);

const port = process.env.port || 4000;
app.listen(4000, () => console.log(`server running on port: ${port}`));
