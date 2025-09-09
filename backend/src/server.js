const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const pool = require("./db/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://techsolutionsfrontend.vercel.app",
    ],
    exposedHeaders: ["X-Total-Count"], // 👈 detta är nyckeln
    credentials: true, // 👈 tillåt cookies
  })
);

// routes
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

app.use("/api", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// 🔹 Endast starta server lokalt
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

// API: Post user för form navigationen controller eller register.
// denna är bara för att visa hur forms funkar, den har inget med login att göra
//  och sätter inga cookies eller hashar psw osv
// använder dessutom ett eget table i PG

// app.post("/api/user", async (req, res) => {
//   try {
//     const { name, email, address } = req.body;
//     if (!name || !email || !address) {
//       return res.status(400).json({ error: "All fields required" });
//     }
//     // Vad gör RETURNING?
//     // Efter att du har gjort INSERT,
//     // returnera den nya raden som skapades – inklusive alla kolumner
//     const result = await pool.query(
//       "INSERT INTO users (name, email, address) VALUES ($1, $2, $3) RETURNING *",
//       [name, email, address]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("Error posting user:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
