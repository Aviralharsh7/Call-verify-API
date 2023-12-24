const dotenv = require("dotenv");
const {validateEnv} = require("./utils/scripts/envSchema");

if (process.env.NODE_ENV != "production"){
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}
else{
  dotenv.config();
}

const {error, value} = validateEnv(process.env);
if (error){
  console.log(`Config validation error: ${error.message}`);
  process.exit(1);
}

const app = require("./app");

const db = require("./models");

db.sequelize
  .authenticate()
  .then(() =>{
    console.log("Connection to MySQL DB established");
  })
  .catch((error)=>{
    console.log("MYSQL DB connection failed: ", error);
  });

db.sequelize.sync({force: false});

const {PORT} = value;
app.listen(PORT, ()=>{
  console.log(`Server running: http://localhost:${PORT}`);
});

module.exports = app;