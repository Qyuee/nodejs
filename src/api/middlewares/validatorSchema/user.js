import Joi from 'joi';

export const user = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .required()
});

export const userSave = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .required()
});