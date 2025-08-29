const pool = require("../db/db");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await pool.query("SELECT * FROM transactions");
    res.json(transactions.rows);
  } catch (error) {}
};
exports.deleteTransaction = async (req, res) => {
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
};
