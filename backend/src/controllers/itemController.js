const pool = require("../db/db");

exports.getItems = async (req, res) => {
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
};
