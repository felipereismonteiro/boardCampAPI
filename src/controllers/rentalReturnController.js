import { connectionDB } from "../database/db.js";

export default async function rentalReturnController(req, res) {
    try {
        const { id } = req.params;
        const { rentDate, delayFee } = req.return;

        const promisse = await connectionDB.query(`UPDATE rentals SET "returnDate"=$1, "rentDate"=$2, "delayFee"=$3 WHERE id=$4`, [rentDate, rentDate, delayFee, id]);
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
        res.send(err.message);
    }
}