const { DataTypes } = require("sequelize");
const db = require("../models");

const Number = db.sequelize.define("Numbers", {
  numberId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  number: {
    type: DataTypes.INTEGER,
    unique: true,
    length: 10,
    allowNull: false,
  },
});

module.exports = Number;