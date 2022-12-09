import { connectionDB } from "../database/db.js";

export default async function customersController(req, res) {
    try {
        const cpf = req.query;
        const customers = await connectionDB.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);
        res.send(customers.rows);
    } catch(err) {
        res.send(err.message);
    }
}