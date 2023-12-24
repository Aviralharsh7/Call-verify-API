const {DataTypes} = require("sequelize");
const db = require("../models");

const Number = db.sequelize.define(
  "Number",
  {
    numberId: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    number: {
      type: DataTypes.INTEGER,
      unique: true,
      length: 10,
      allowNull: false,
    },
  },
);

module.exports = Number;