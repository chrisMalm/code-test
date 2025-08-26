const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "usersDb", // OBS: detta måste matcha din databas
  password: "2126",
  port: 5432,
});

module.exports = pool;
