import { connection } from "../database/db.js";

export default async function categoriesGetController(req, res) {
    try {
        const categories = await connection.query("SELECT * FROM categories");
        res.send(categories.rows);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}