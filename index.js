const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.get("/", (req, res) => {
  res.send("Server is working atleast!");
});

app.listen(PORT, () => {
  console.log("Server is up. at ", PORT);
  mongoose.connect(MONGO_URL).then(() => {
    console.log("connected to db");
  });
});
