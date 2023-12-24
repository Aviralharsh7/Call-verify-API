const JWT = require("jsonwebtoken");
const {STATUS_CODES} = require("http");

async function verifyJWT (req, res, next){
  try {
    const {jwt} = req.cookies;
    if(!jwt){
      return res.status(401).json({
        statusCode: 401,
        error: STATUS_CODES[401],
        message: "User not signed in",
      });
    }

    const decodedData = await JWT.verify(jwt, process.env.JWT_SECRET);
    const {data} = decodedData;

    if (!data){
      return res.status(403).json({
        statusCode: 403,
        error: STATUS_CODES[403],
        message: "Invalid credentials or Token expired"
      });
    }
    
    Object.assign(req, {userData: decodedData.data});
    next();
  }
  catch(error){
    next(error);
  }
}

module.exports = verifyJWT;