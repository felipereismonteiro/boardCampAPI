import { connectionDB } from "../database/db.js";

export async function customersPostController(req, res) {
    try {
        const { name, phone, cpf, birthday } = req.user;
        await connectionDB.query(`INSERT INTO customers(name, phone, cpf, birthday) VALUES($1, $2, $3, $4)`, [name, phone, cpf, birthday])
        res.sendStatus(200);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

export async function customersPutController(req, res) {
    try {
        const { id } = req.params;
        const { name, phone, cpf, birthday } = req.user;
        await connectionDB.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [name, phone, cpf, birthday, id])
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.send(err.message);
    }
}