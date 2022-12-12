import { connectionDB } from "../database/db.js";

export default async function rentalsGetController(req, res, next) {
  try {
    const {customerId, gameId} = req.query;

    const rentals = await connectionDB.query(`SELECT * FROM rentals`);
    const customers = await connectionDB.query(`SELECT customers.id, customers.name FROM customers JOIN rentals ON rentals."customerId" = customers.id`)
    const games = await connectionDB.query(`SELECT games.id, games.name, games."categoryId", categories.name as "categoryName" FROM games JOIN rentals ON rentals."gameId" = games.id JOIN categories ON categories.id = games."categoryId"`)

    if (customerId !== undefined && gameId === undefined) {
      const customers = await connectionDB.query(`SELECT customers.id, customers.name FROM customers WHERE id=$1`, [customerId]);
      rentals.rows[0].customer = customers.rows[0];
      return res.send(rentals.rows);
    } else if (customerId === undefined && gameId !== undefined) {
      const games = await connectionDB.query(`SELECT games.id, games.name, games."categoryId", categories.name as "categoryName" FROM games WHERE id=$1`, [gameId]);
      rentals.rows[0].game = games.rows[0];
      return res.send(rentals.rows);
    }

    rentals.rows[0].customer = customers.rows[0];
    rentals.rows[0].game = games.rows[0];

    res.send(rentals.rows);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}
