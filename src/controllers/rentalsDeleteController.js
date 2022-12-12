import { connectionDB } from "../database/db.js";

export default async function rentalsdDeleteController(req, res) {
    try {
        const id = req.id;
        await connectionDB.query(`DELETE FROM rentals WHERE id=$1`,[id]);
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}