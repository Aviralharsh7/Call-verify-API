const Joi = require("joi");
const {STATUS_CODES} = require("http");
const {userRecordExists} = require("../services/userService");
const {getAllMatches} = require("../services/numberService");

const searchNamePayloadSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .required()
    .max(50)
    .regex(/^[^!@#$%^&*(){}\[\]\\\.;'",.<>/?`~|0-9]*$/)
    .message("Name should not contain any special character or number"),
});

async function searchByName( req, res, next){
  try {
    const payload = req.params;
    const {error, value} = searchNamePayloadSchema.validate(payload);
    if (!!error) {
      return res.status(422).json({
        statusCode: 422,
        error: STATUS_CODES[422],
        message: error.message,
      });
    }
    

  }
  catch (error){
    console.log(error);
    next(error);
  }
}


const searchNumberPayloadSchema = Joi.object().keys({
  number: Joi.string()
    .trim()
    .required()
    .length(10)
    .message("Number is invalid"),
});


async function searchByNumber(req, res, next) {
  try {
    const payload = req.params;
    payload = normalisePhoneNumber(payload);

    const {error, value} = searchNumberPayloadSchema.validate(payload);
    if (!!error) {
      return res.status(422).json({
        statusCode: 422,
        error: STATUS_CODES[422],
        message: error.message,
      });
    }

    const { number } = value;
    const user = await userRecordExists(number);
    if (user){
      // const user = getter func 
      return res.status(200).json({
        statusCode: 200,
        message: "User found in registered users",
        data: user.dataValues,
      });
    }

    const globalMatches = await getAllMatches(number);
    if (!globalMatches){
      return res.status(204).json({
        statusCode: 204,
        error: STATUS_CODES[204],
        message: "Number not found",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Following matches found:",
      data: globalMatches,
    });

  } 
  catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  searchByName,
  searchByNumber,
};