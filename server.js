const { Sequelize } = require("sequelize");
const port = 8000;
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
});
module.exports = sequelize;

sequelize.sync();
const app = require("./app");

app.listen(port, () => {
  console.log("I am running");
});
