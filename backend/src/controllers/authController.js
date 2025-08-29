const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");

const JWT_SECRET = process.env.JWT_SECRET || "superhemligt";

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM newusers");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// signup
exports.signup = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;
    if (!name || !email || !address || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await pool.query("SELECT * FROM newusers WHERE email=$1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const result = await pool.query(
      "INSERT INTO newusers (name,email,address,password) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, address, hashedPassword]
    );
    const user = result.rows[0];
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("token", token, { httpOnly: true, sameSite: "lax" })
      .status(201)
      .json({ user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// login
exports.login = async (req, res) => {
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
};

// logout
exports.logout = async (req, res) => {
  console.log("i apiet be");
  res.clearCookie("token").status(200).json({ message: "Logged out" });
};

// me
exports.me = async (req, res) => {
  res.json({ user: req.user });
};

// protected
exports.protected = async (req, res) => {
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
};
