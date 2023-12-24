const Number = require("../models/Number");

async function getAllMatches(number){
  const response = await Number.findAll({
    where: {
      number: number,
    }
  });
};

module.exports = {
  getAllMatches,
};
