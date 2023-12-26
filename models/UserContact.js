const { DataTypes } = require("sequelize");
const db = require("../models");
const User = require("./User");
const Number = require("./Number");

const UserContact = db.sequelize.define("UserContact", {
  number_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: Number,
      key: "numberId",
    },
  },
  user_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// UserContact.belongsTo(Number, {foreignKey: "numberId" });
// UserContact.belongsTo(User, {foreignKey: "userId" });

module.exports = UserContact;
