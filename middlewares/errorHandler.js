const {STATUS_CODES} = require("http");

const errorHandler = (err, _req, res, _next) =>{
  console.log(err);
  return res
    .status(500)
    .json({
      statusCode: 500,
      error: STATUS_CODES[500],
      message: err.message,
    });
};

module.exports = errorHandler;