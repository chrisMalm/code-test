const express = require("express");
const {
  deleteTransaction,
  getTransactions,
} = require("../controllers/transactionController");

const router = express.Router();

router.delete("/transaction/:id", deleteTransaction);
router.get("/transactions", getTransactions);

module.exports = router;
