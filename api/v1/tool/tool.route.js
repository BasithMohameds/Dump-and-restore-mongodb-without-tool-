const express = require("express");
const ToolRoute = express.Router();

const {
  mongodbDump,
  mongodbRestore,
  showAllDatabaseNames,
} = require("./tool.service");

const { catchAsync } = require("../../../utils/validation");

//mongodb dump api
ToolRoute.post("/dump", catchAsync(mongodbDump));

//mongodb restore api
ToolRoute.post("/restore", catchAsync(mongodbRestore));

//show all dumped database name list
ToolRoute.get("/list", catchAsync(showAllDatabaseNames));

module.exports = ToolRoute;
