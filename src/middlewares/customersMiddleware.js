import { connectionDB } from "../database/db.js";
import { customersSchema } from "../models/customersSchema.js";

export async function customersMiddleware(req, res, next) {
    try {
        const validate = await customersSchema.validateAsync(req.body, {abortEarly: false});
        const userFounded = await connectionDB.query(`SELECT * FROM customers WHERE cpf=$1`, [validate.cpf])

        if (userFounded.rows.length !== 0) {
            return res.status(401).send("CPF already in use!!!");
        }

        req.user = validate;
        next();
    } catch (err) {
        res.status(400).send(err.message);
    }
}

export async function customersPutMiddleware(req, res, next) {
    try {
        const validate = await customersSchema.validateAsync(req.body, {abortEarly: false});

        req.user = validate;
        next();
    } catch (err) {
        res.status(400).send(err.message);
    }
}