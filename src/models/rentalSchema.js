import Joi from "joi";

export const rentalSchema = Joi.object({
    customerId: Joi.required(),
    gameId: Joi.required(),
    daysRented: Joi.required()
})