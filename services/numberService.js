const Number = require("../models/Number");
const UserContact = require("../models/UserContact");

async function numberRecordExists(number) {
  try {
    const numberDoc = await Number.findOrCreate({
      where: {
        number: number,
      },
    });
    return numberDoc;
  } catch (error) {
    throw error;
  }
}

async function getAllMatches(number){
  const numberDoc = await numberRecordExists(number);
  const response = await UserContact.findAll({
    where: {
      number_Id: numberDoc[0].numberId,
    }
  });
  return response;
};

module.exports = {
  getAllMatches,
  numberRecordExists
};
