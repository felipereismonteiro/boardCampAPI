import { connectionDB } from "../database/db.js";

export default async function customersGetId(req, res) {
  try {
    const id = req.params.id;
    const customer = await connectionDB.query(`SELECT * FROM customers WHERE id = $1`, [id]);
    
    if (customer.rows.length === 0) {
        return res.sendStatus(404);
    }

    res.send(customer.rows[0]);
  } catch (err) {
    res.status(400).send(err.message);
  }
}
