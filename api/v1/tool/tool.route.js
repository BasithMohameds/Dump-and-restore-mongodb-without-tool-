const express = require("express");
const toolRoute = express.Router();

const {
  mongodbDump,
  mongodbRestore,
  showAllDatabaseNames,
} = require("./tool.service");

const { catchAsync } = require("../../../utils/validation");

//mongodb dump api
toolRoute.post("/dump", catchAsync(mongodbDump));

//mongodb restore api
toolRoute.post("/restore", catchAsync(mongodbRestore));

//show all dumped database name list
toolRoute.get("/list", catchAsync(showAllDatabaseNames));

module.exports = toolRoute;
