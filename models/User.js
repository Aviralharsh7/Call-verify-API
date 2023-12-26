const { DataTypes } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Number = require("./Number");

const User = db.sequelize.define("User", {
  userId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  number_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: Number,
      key: "numberId",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// // association
// User.belongsTo(Number, {foreignKey: "number_Id"});

// instanceMethods
User.prototype.matchPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return !!match ?? false;
  } catch (error) {
    throw error;
  }
};

User.prototype.generateJWT = function () {
  try {
    return jwt.sign({ data: this.dataValues }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = User;
