const db = require("mysql");

module.exports = db.createConnection({
  host: "localhost",
  user: "maya",
  password: "maya",
  database: "projectdb",
});
