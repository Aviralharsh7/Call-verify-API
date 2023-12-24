const Joi = require("joi");
const { STATUS_CODES } = require("http");

const { userRecordExists} = require("../../services/userService");

const signinPayloadSchema = Joi.object().keys({

  number: Joi.string()
    .trim()
    .required()
    .length(10)
    .message("Number is invalid"),

  password: Joi.string().trim().required(),

});

async function signin(req, res, next){
  try {
    const payload = req.body;
    const {error, value} = signinPayloadSchema.validate(payload);
    if (!!error) {
      return res.status(422).json({
        statusCode: 422,
        error: STATUS_CODES[422],
        message: error.message,
      });
  }
  
    const { number, password } = value;
    const user = await userRecordExists(number);
    console.log("1111111", user);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        error: STATUS_CODES[404],
        message: "User not found",
      });
    }

    const matchPassword = await user.matchPassword(password);
    if (!matchPassword) {
      return res.status(400).json({
        statusCode: 400,
        error: STATUS_CODES[400],
        message: "Number or Password is incorrect",
      });
    }

    res.cookie("jwt", user.generateJWT());

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully signed in",
    });

  }
  catch(error){
    console.log(error);
    next(error);
  }
}

module.exports = signin;