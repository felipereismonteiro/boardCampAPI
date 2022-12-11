import { connectionDB } from "../database/db.js";

export default async function rentalsPostController(req, res) {
    try {
        const {customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee} = req.rent;

        await connectionDB.query(`\
        INSERT INTO 
         rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
         VALUES($1, $2, $3, $4, $5, $6, $7);
        `,[customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])

        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}