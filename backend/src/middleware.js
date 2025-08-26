const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  // Vid error stoppas anropet o apiet ex /protected körs inte alls
  if (!token) {
    return res.status(401).json("Ingen token tillgänglig");
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token ogiltig" });
    }
    req.user = user; // användarinformation tillgänglig i nästa middleware/route
    // next() – inga fel
    // → då går flödet vidare till din route, t.ex. /api/protected.
    next();
  });
}
module.exports = { authenticateToken }; // 👈 CommonJS-export
