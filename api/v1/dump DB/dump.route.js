const express = require("express");
const DumpRoute = express.Router();

const {
  mongodbDump,
  mongodbRestore,
  showAllDatabaseNames,
} = require("./dump.service");

//dynamic data dump db server to local
DumpRoute.post("/dumpdb", async (req, res) => {
  return await mongodbDump(req).then(({ message, status }) => {
    return res.json({ message, status });
  });
});

//dynamic data restore db server to local
DumpRoute.post("/restoredb", async (req, res) => {
  return await mongodbRestore(req).then(({ message, status }) => {
    return res.json({ message, status });
  });
});

DumpRoute.get("/folderlist", async (req, res) => {
  return await showAllDatabaseNames().then(({ message, status }) => {
    return res.json({ message, status });
  });
});

module.exports = DumpRoute;
