import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
    PORT: Joi.number().required(),
    STAGE: Joi.string().required(), //Note: This will come from command-line and will not be present in any of the .env.stage files
    DB_TYPE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432).required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
});