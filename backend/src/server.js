const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { authenticateToken } = require("./middleware"); // 👈 ingen filändelse behövs

// .env filen måste ligga i roten i backend projectet plus att npm i dotenv
const JWT_SECRET = process.env.JWT_SECRET || "superhemligt"; // Lägg in i .env i produktion!

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // din frontend-url
    exposedHeaders: ["X-Total-Count"], // 👈 detta är nyckeln
    credentials: true, // 👈 tillåt cookies
  })
);

// API: Hämta alla users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// API: Hämta alla items
app.get("/api/items", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  // OFFSET talar om för Postgres hur många rader som ska hoppas över,
  //  baserat på sidnumret.
  // T.ex. om page = 3 och limit = 10 → OFFSET = 20 → hoppa över de 20 första raderna
  const offset = (page - 1) * limit;
  try {
    // PG läser igenom alla rader i tabellen . hoppar över rader från offset
    // och returnerar nästa 10 rader från limit
    const result = await pool.query("SELECT * FROM items LIMIT $1 OFFSET $2", [
      limit,
      offset,
    ]);
    // SQL COUNT räknar hur många rader de finns
    const countResult = await pool.query("SELECT COUNT(*) FROM items");
    // 10 gör total till heltal
    const total = parseInt(countResult.rows[0].count, 10);

    res.setHeader("X-Total-Count", total);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// API: Post user för form navigationen controller eller register.
app.post("/api/user", async (req, res) => {
  try {
    const { name, email, address } = req.body;
    if (!name || !email || !address) {
      return res.status(400).json({ error: "All fields required" });
    }
    // Vad gör RETURNING?
    // Efter att du har gjort INSERT,
    // returnera den nya raden som skapades – inklusive alla kolumner
    const result = await pool.query(
      "INSERT INTO users (name, email, address) VALUES ($1, $2, $3) RETURNING *",
      [name, email, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error posting user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await pool.query("SELECT * FROM transactions");
    res.json(transactions.rows);
  } catch (error) {}
});

// ta bort en transaction via Id
app.delete("/api/transaction/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTransaction = await pool.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING *",
      [id]
    );
    if (deleteTransaction.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({
      message: "Transaction deleted",
      deleted: deleteTransaction.rows[0],
    });
  } catch (error) {
    console.error("Error deleting a transaction:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// add user for signup part
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, address, password } = req.body;
    // hash password med bcrypt i be
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !address || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM newusers WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      // skickar med json till fe via redux slice  för error förklaring
      return res.status(409).json({ error: "Email already exists" });
    }
    // Vad gör RETURNING?
    // Efter att du har gjort INSERT,
    // returnera den nya raden som skapades – inklusive alla kolumner
    const result = await pool.query(
      "INSERT INTO newusers (name, email, address, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, address, hashedPassword]
    );

    const user = result.rows[0];

    // Skapa JWT-token med användarinfo (t.ex id, email)
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // bara via HTTPS i prod
        sameSite: "lax", // skydd mot CSRF
        maxAge: 3600000, // 1h
      })
      .status(201)
      // sätt cookien i browsern och skicka in usern till signup slicen i redux
      .json({ user });
  } catch (err) {
    // vid err skickas res.status tillbax till redux !res.ok
    console.error("Error posting user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/protected", authenticateToken, async (req, res) => {
  // om authenticateToken gått vidare till next()
  // finns det garanterat en token o du kan säkert hämta data från /protected
  try {
    const result = await pool.query("SELECT * FROM protected");
    const secret = result.rows[0];
    const user = req.user; // ← garanterat finns här

    return res.status(200).json({ secret, user });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email | !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }
  const userResult = await pool.query(
    "SELECT * FROM newusers WHERE email = $1",
    [email]
  );

  if (userResult.rows.length === 0) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = userResult.rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid Credentails" });
  }

  // Skapa JWT-token med användarinfo (t.ex id, email)
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, address: user.address },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // bara via HTTPS i prod
      sameSite: "lax", // skydd mot CSRF
      maxAge: 3600000, // 1h
    })
    .status(201)
    .json({ user });
});

app.get("/api/me", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.post("/api/logout", (req, res) => {
  console.log("i apiet be");

  res.clearCookie("token").status(200).json({ message: "Logged out" });
});
