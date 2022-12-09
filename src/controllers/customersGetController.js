import { connectionDB } from "../database/db.js";

export default async function customersController(req, res) {
    try {
        const cpf = req.query.cpf;
        if (cpf) {
            const customers = await connectionDB.query(`SELECT * FROM customers WHERE cpf LIKE ( $1||'%')`, [cpf]);
            return res.send(customers.rows);
        };  
        const customers = await connectionDB.query(`SELECT * FROM customers`);
        res.send(customers.rows);
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}