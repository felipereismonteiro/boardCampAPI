import { connectionDB } from "../database/db.js";

export default async function gamePostController(req, res) {
    try {
        const {name, image, stockTotal, categoryId, pricePerDay} = req.validate;
        
        await connectionDB.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES($1, $2, $3, $4, $5);', [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}