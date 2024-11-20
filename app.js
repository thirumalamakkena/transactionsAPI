const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "database.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();


app.get("/api/transactions/:transaction_id", async (req, res) => {

  const { transaction_id } = req.params;
  const query = `SELECT transaction_id,amount,transaction_type,timestamp,status FROM transactions WHERE transaction_id = ${transaction_id}`;
  const transactions = await db.get(query);
  res.send(transactions);
});

app.get("/api/transactions/", async (req, res) => {
  const {user_id} = req.query;
  const query = `SELECT transaction_id,amount,transaction_type,timestamp,status FROM transactions WHERE user = ${user_id}`;
  const transactions = await db.all(query);
  res.send({transactions});
});

app.post("/api/transactions/",async (req, res) => {
  const { amount, transaction_type, user } = req.body;
  const query = `INSERT INTO transactions (amount, transaction_type, user) VALUES (${amount}, '${transaction_type}', ${user})`;
  const dbResponse = await db.run(query);
  const newTransaction = await db.get(`SELECT * FROM transactions WHERE transaction_id = ${dbResponse.lastID}`);
  res.send(newTransaction);
});

app.put("/api/transactions/:transaction_id/", async (req, res) => { 
  const { transaction_id } = req.params;
  const { status } = req.body;
  const query = `UPDATE transactions SET status = '${status}' WHERE transaction_id = ${transaction_id }`;
  await db.run(query);
  const updatedTransaction = await db.get(`SELECT transaction_id,amount,transaction_type,timestamp,status  FROM transactions WHERE transaction_id = ${transaction_id}`);
  res.send(updatedTransaction);
}
);



