import { connectionDB } from "../database/db.js";

export default async function gamesGetController(req, res) {
    try {
        const relation = await connectionDB.query(`SELECT * FROM games JOIN categories ON games."categoryId" = categories.id`);

        const games = await connectionDB.query('SELECT games.*,categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;');
        res.send(games.rows);
    } catch(err) {
        res.status(400).send(err);
    }
}