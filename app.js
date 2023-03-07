const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const toolRoute = require("./api/v1/tool/tool.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/Tool", toolRoute);
app.get("/", function (req, res) {
  res.send("Backend Api Running...!");
});

app.listen(process.env.APP_PORT, () => {
  console.log("server started..!");
});
