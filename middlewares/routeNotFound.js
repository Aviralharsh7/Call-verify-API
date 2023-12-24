const {STATUS_CODES} = require("http");

const routeNotFound = (_req, res, next) => {
  return res
    .status(404)
    .json({
      statusCode: 404,
      error: STATUS_CODES[404],
      message: "Route not found",
    });
};

module.exports = routeNotFound;