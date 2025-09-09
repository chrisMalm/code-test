const { Pool } = require("pg");

let pool;

if (!global._pool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Neon kräver detta
  });
  global._pool = pool;
} else {
  pool = global._pool;
}

// const pool = new Pool({
//   connectionString:
//     process.env.DATABASE_URL ||
//     "postgres://postgres:2126@localhost:5432/usersDb",
//   ssl: {
//     rejectUnauthorized: false, // krävs för Neon serverless på Vercel
//   },
// });

// pool.connect((err, client, release) => {
//   if (err) {
//     console.error("Databasanslutning misslyckades:", err.stack);
//   } else {
//     console.log("Databas ansluten!");
//     release();
//   }
// });
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "usersDb", // OBS: detta måste matcha din databas
//   password: "2126",
//   port: 5432,
// });

module.exports = pool;
