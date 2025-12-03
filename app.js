const db = require("./db/connection");
const express = require("express");
const topicsRouter = require("./controllers/topics.controller");
const app = express();

app.use(express.json());

app.get("/api/topics", (req, res) => {
  res.send("Exp. app now running!");
});

module.exports = app;
