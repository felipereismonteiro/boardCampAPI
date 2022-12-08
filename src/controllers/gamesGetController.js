import { connection } from "../database/db.js";

export default async function gamesGetController(req, res) {
    try {
        const games = await connection.query('SELECT * FROM games;');
        res.send(games.rows);
    } catch(err) {
        res.status(400).send(err);
    }
}