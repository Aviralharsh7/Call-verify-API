const User = require("../models/User");
const bcrypt = require("bcrypt");

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
    data.password = await bcrypt.hash(data.password, 10);
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