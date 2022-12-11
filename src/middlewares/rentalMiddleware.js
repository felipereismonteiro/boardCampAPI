import { connectionDB } from "../database/db.js";
import { rentalSchema } from "../models/rentalSchema.js"

export default async function rentalMiddleware(req, res, next) {
    try {
        const body = req.body;
        const {customerId, gameId, daysRented} = await rentalSchema.validateAsync(body, {abortEarly: false});
        
        const existingClient = await connectionDB.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);
        const existingGame = await connectionDB.query(`SELECT * FROM games WHERE id=$1`, [gameId])

        const gameStock = await connectionDB.query(`SELECT * FROM rentals WHERE "gameId"=$1`, [gameId])

        if(existingClient.rows.length === 0 || existingGame.rows.length === 0 || daysRented <= 0 || gameStock.rows.length >= existingGame.rows[0].stockTotal) {
            return res.sendStatus(400);
        }

        const date = new Date();
        const game = await connectionDB.query(`SELECT * FROM games WHERE id=$1`,[gameId])
        
        const rentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
        const originalPrice = (game.rows[0].pricePerDay * daysRented);

        
        const rent = {
            customerId,
            gameId,
            rentDate,    
            daysRented,             
            returnDate: null,          
            originalPrice,       
            delayFee: null             
          }
        req.rent = rent;
        next();
    } catch (err) {
        console.log(err);
        res.send(err.details.map(d => d.message));
    }
}