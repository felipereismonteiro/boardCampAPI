import { connection } from "../database/db.js";
import { categoriesSchema } from "../models/categoriesSchema.js";

export default async function categoriesMiddleware(req, res, next) {
  try {
    const validate = await categoriesSchema.validateAsync(req.body, { abortEarly: false });
    const categories = await connection.query("SELECT * FROM categories WHERE name=$1", [validate.name]);

    if(categories.rows.length !== 0) {
        return res.sendStatus(409);
    }
    req.name = validate.name;
    next();
  } catch (err) {
    
    res.status(400).send(err.details.map((d) => d.message));
  }
}
