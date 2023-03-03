const express = require("express");
const DumpRoute = express.Router();

const {
  dumpDbDatabase,
  mongodbDump,
  mongodbRestore,
  showAllDatabaseNames,
} = require("./dump.service");

const { dumpDataValidation } = require("../../../utils/express.validation");

//mongodb dump and restore server to local
// DumpRoute.get("/", async (req, res) => {
//   return await dumpDbDatabase(req).then(({ message, status }) => {
//     return res.json({ message, status });
//   });
// });

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
