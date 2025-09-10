const { Pool } = require("pg");

// let pool;

// if (!global._pool) {
//   pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false }, // Neon kräver detta
//   });
//   global._pool = pool;
// } else {
//   pool = global._pool;
// }

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

const connectionString =
  process.env.DATABASE_URL || "postgres://postgres:2126@localhost:5432/usersDb";

const poolOptions = {
  connectionString,
};

// Bestäm om vi behöver SSL (Neon / remote DB)
// - Om host är localhost eller 127.0.0.1 -> INTE ssl
// - Annars: enable ssl (rejectUnauthorized false behövs ofta för Neon)
try {
  const url = new URL(connectionString);
  const hostname = url.hostname;
  if (hostname !== "localhost" && hostname !== "127.0.0.1") {
    poolOptions.ssl = { rejectUnauthorized: false };
  }
} catch (err) {
  // ignore parsing error, fallback: om NODE_ENV === 'production' slå på ssl
  if (process.env.NODE_ENV === "production") {
    poolOptions.ssl = { rejectUnauthorized: false };
  }
}

// Återanvänd pool i serverless environment
let pool;
if (!global._pgPool) {
  pool = new Pool(poolOptions);
  global._pgPool = pool;
} else {
  pool = global._pgPool;
}

module.exports = pool;
