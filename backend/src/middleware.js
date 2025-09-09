const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  console.log("Cookies received:", req.cookies);
  console.log("Authorization header:", req.headers["authorization"]);
  const token = req.cookies.token;

  // Vid error stoppas anropet o apiet ex /protected körs inte alls
  if (!token) {
    console.log("Ingen token tillgänglig");

    return res.status(401).json("Ingen token tillgänglig");
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token ogiltig:", err.message);

      return res.status(403).json({ error: "Token ogiltig" });
    }
    console.log("Token giltig, user:", user);

    req.user = user; // användarinformation tillgänglig i nästa middleware/route
    // next() – inga fel
    // → då går flödet vidare till din route, t.ex. /api/protected.
    next();
  });
}
module.exports = { authenticateToken }; // 👈 CommonJS-export
