const express = require("express");
const DumpRoute = express.Router();

const {
  mongodbDump,
  mongodbRestore,
  showAllDatabaseNames,
} = require("./dump.service");

//mongodb dump api
DumpRoute.post("/dumpdb", async (req, res) => {
  return await mongodbDump(req).then(({ message, status }) => {
    return res.json({ message, status });
  });
});

//mongodb restore api
DumpRoute.post("/restoredb", async (req, res) => {
  return await mongodbRestore(req).then(({ message, status }) => {
    return res.json({ message, status });
  });
});

//mongodb existing dump database show list
DumpRoute.get("/folderlist", async (req, res) => {
  return await showAllDatabaseNames().then(({ message, status }) => {
    return res.json({ message, status });
  });
});

module.exports = DumpRoute;
