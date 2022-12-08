import { connectionDB } from "../database/db.js"

export default async function categoriesPostController(req, res) {
    try {
        await connectionDB.query("INSERT INTO categories (name) VALUES ($1)", [req.name])
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
    }
}