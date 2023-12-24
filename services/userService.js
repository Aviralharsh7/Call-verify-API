const User = require("../models/User");

async function userRecordExists(number){
  try {
    const user = await User.findOne({
      where:{
        number: number,
      },
    });
    return user;
  }
  catch(error){
    throw error;
  }
}

async function createUser(data){
  try {
    data["userId"] = crypto.randomUUID();
    const response = await User.create(data);
    return response;
  }
  catch(error){
    throw error;
  }
}

module.exports = {
  userRecordExists,
  createUser,
}