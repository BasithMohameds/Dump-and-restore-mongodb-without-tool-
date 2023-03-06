const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const DumpRoute = require("./api/v1/dump DB/dump.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/mongodb", DumpRoute);

app.get("/", function (req, res) {
  res.send("Backend Api Running...!");
});

app.listen(process.env.APP_PORT, () => {
  console.log("server started..!");
});
