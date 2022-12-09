import joi from "joi";

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().regex(/^\d+$/).min(10).max(11).required(),
    cpf: joi.string().regex(/^\d+$/).min(11).max(11).required(),
    birthday: joi.string().regex(/(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
})