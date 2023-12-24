const {STATUS_CODES} = require("http");

const errorHandler = (error, _req, res, _next) =>{
  console.log(error);
  return res
    .status(500)
    .json({
      statusCode: 500,
      error: STATUS_CODES[500],
      message: error.message,
    });
};

module.exports = errorHandler;