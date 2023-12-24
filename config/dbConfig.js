const dbConfig = {
  HOST: "dbinstance.cg3gfe0errko.ap-south-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "12345678",
  DB: "testDB",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = dbConfig;