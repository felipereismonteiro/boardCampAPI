import { connectionDB } from "../database/db.js";
import { rentalSchema } from "../models/rentalSchema.js";

export async function rentalMiddleware(req, res, next) {
  try {
    const body = req.body;
    const { customerId, gameId, daysRented } = await rentalSchema.validateAsync(
      body,
      { abortEarly: false }
    );

    const existingClient = await connectionDB.query(
      `SELECT * FROM customers WHERE id=$1`,
      [customerId]
    );
    const existingGame = await connectionDB.query(
      `SELECT * FROM games WHERE id=$1`,
      [gameId]
    );

    const gameStock = await connectionDB.query(
      `SELECT * FROM rentals WHERE "gameId"=$1`,
      [gameId]
    );

    if (
      existingClient.rows.length === 0 ||
      existingGame.rows.length === 0 ||
      daysRented <= 0 ||
      gameStock.rows.length >= existingGame.rows[0].stockTotal
    ) {
      return res.sendStatus(400);
    }

    const date = new Date();
    const game = await connectionDB.query(`SELECT * FROM games WHERE id=$1`, [
      gameId,
    ]);

    const rentDate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    const originalPrice = game.rows[0].pricePerDay * daysRented;

    const rent = {
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate: null,
      originalPrice,
      delayFee: null,
    };

    console.log(rent)

    req.rent = rent;
    next();
  } catch (err) {
    console.log(err);
    res.send(err.details.map((d) => d.message));
  }
}

export async function rentalDeleteMiddleware(req, res, next) {
  try {
    const { id } = req.params;
    const existingId = await connectionDB.query(
      `SELECT * FROM rentals WHERE id=$1`,
      [id]
    );

    if (
      existingId.rows.length === 0 ||
      existingId.rows[0].returnDate !== null
    ) {
      return res.sendStatus(400);
    }
    req.id = id;
    next();
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}

export async function rentalReturnMiddleware(req, res, next) {
    try {
        const id = req.params.id;

        const existingRental = await connectionDB.query(`SELECT * FROM rentals WHERE id=$1`, [id])

        if (existingRental.rows.length === 0) {
            return res.sendStatus(404);
        } else if (existingRental.rows[0].returnDate !== null) {
            return res.sendStatus(400);
        }

        const rental = existingRental.rows;
        const date = new Date();
        const rentDate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
        const returnDay = Number(rental[0].rentDate.toString().split(" ")[2]) + rental[0].daysRented
        let delayFee = 0;

        if (date.getDate() > returnDay) {
          const fees = date.getDate() - returnDay;
          delayFee = rental[0].originalPrice * fees;
        }

        
        req.return = { rentDate, delayFee }
        next();
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}
