const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:2126@localhost:5432/usersDb",
  ssl: {
    rejectUnauthorized: false, // krävs för Neon serverless på Vercel
  },
});
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "usersDb", // OBS: detta måste matcha din databas
//   password: "2126",
//   port: 5432,
// });

module.exports = pool;
