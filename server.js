const dotEnv = require("dotenv").config();
const express = require("express");
const errorHandling = require("./middlewares/errorHandling");
const db = require("./config/db");

db.connect();
const port = process.env.SERVER_PORT || 5000;
const app = express();

app.use(express.json());
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/users", require("./routes/users"));

app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
