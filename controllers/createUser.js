const {User} = require("../models/User");
async function createUser(req, res, next){
  try {
    // const {user} = body.payload;

    const result = await User.create({ 
      name: "Jane", 
      email: "Doe" 
    });
    return res
      .status(200)
      .json({"ok ok": "message"});

  } catch (error){
    console.log(error);
    next(error);
  }
}

module.exports = createUser;