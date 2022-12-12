import { connectionDB } from "../database/db.js";
import { gameSchema } from "../models/gameSchema.js";

export default async function gameMiddleware(req, res, next) {
    try {
        const { name, categoryId } = req.body;
        const validate = await gameSchema.validateAsync(req.body, {abortEarly: false});
        const categorie = await connectionDB.query("SELECT * FROM categories WHERE id=$1", [categoryId])
        const nameFounded = await connectionDB.query("SELECT * FROM games WHERE name=$1", [name]);

        if (categorie.rows.length === 0) {
            return res.sendStatus(400);
        } else if(nameFounded.rows.length !== 0) {
            return res.sendStatus(409);
        }

        req.validate = validate;
        console.log(validate);
        next();
    } catch(err) {
        res.send(err.details.map(d => d.message));
    }
}