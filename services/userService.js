const User = require("../models/User");
const bcrypt = require("bcrypt");
const {numberRecordExists} = require("../services/numberService");

async function userRecordExists(number){
  try {
    const numberDoc = await numberRecordExists(number); // less time - should not create number if already exists incase of sign in.
    const user = await User.findOne({
      where: {
        number_Id: numberDoc[0].numberId,
      },
    });
    return user;
  }
  catch(error){
    throw error;
  }
}

async function createUser(data, number_Id){
  try {
    delete data.confirmPassword;
    data.password = await bcrypt.hash(data.password, 10);
    data.number_Id = number_Id;
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
};