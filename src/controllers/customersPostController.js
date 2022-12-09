import { connectionDB } from "../database/db.js";

export default async function customersPostController(req, res) {
    try {
        const { name, phone, cpf, birthday } = req.user;
        await connectionDB.query(`INSERT INTO customers(name, phone, cpf, birthday) VALUES($1, $2, $3, $4)`, [name, phone, cpf, birthday])
        res.sendStatus(200);
    } catch(err) {
        res.status(400).send(err.message);
    }
}