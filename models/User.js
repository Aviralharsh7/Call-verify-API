const {DataTypes} = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.sequelize.define(
  "User",
  {
    userId: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
      unique: true,
      length: 10,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
);

User.prototype.matchPassword = async function(password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return !!match ?? false;
  } 
  catch (error){
    throw error;
  }
};

User.prototype.generateJWT = async function (){
  try{
    return jwt.sign({data: this.dataValues}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }
  catch(error){
    throw error;
  }
}

module.exports = User;