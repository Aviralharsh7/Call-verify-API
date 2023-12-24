const {DataTypes} = require("sequelize");
const db = require("../models");

const User = db.sequelize.define("User", {
  userId: {
    primaryKey: true,
    type: DataTypes.UUID
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
    allowNull: true
  },
  password: {
    type: DataTypes.STRING
  },
});

module.exports = User;