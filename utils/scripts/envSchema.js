const Joi = require("joi");

const EnvSchema = Joi
  .object()
  .keys({
    PORT: Joi
      .alternatives(
        Joi.string().regex(/^\d+$/), 
        Joi.number()
      )
      .required(),

    JWT_SECRET: Joi.string().min(32).required(),
    DB_HOST: Joi.string().hostname().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
  })
  .unknown(true);

/** 
 * Validates process.env variables
 * @param {Object} env - env object to validate 
**/
const validateEnv = (env) =>{
  return EnvSchema.validate(env);
};

module.exports = {
  validateEnv,
};