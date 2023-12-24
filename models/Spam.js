const {DataTypes} = require("sequelize");
const db = require("../models");

const User = require("./User");
const Number = require("./Number");

const Spam = db.sequelize.define("Spam", {
  number_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Number",
      key: "numberId",
    },
  },
  user_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: "User",
      key: "userId",
    },
  },
});

Spam.belongsTo(Number, {foreignKey: "numberId" });
Spam.belongsTo(User, {foreignKey: "userId" });

module.exports = Spam;