const cmd = require("node-cmd");
const { spawn } = require("child_process");
const restore = require("mongodb-restore-dump");
const path = require("path");
const fs = require("fs");

const { dumpUriValidation } = require("../../../utils/express.validation");

//show all dumped database name list
exports.showAllDatabaseNames = async () => {
  try {
    FolderNames = fs.readdirSync(path.resolve("dump"));
    return { message: FolderNames, status: true };
  } catch (err) {
    console.log(err);
    return { message: err.message, status: false };
  }
};

//dump mongodb checking api
exports.mongodbDump = async ({ body = {} }) => {
  try {
    const { dumpDbUri } = body;
    const validatedDumpUri = dumpUriValidation(dumpDbUri);
    console.log({ validatedDumpUri });

    if (!dumpDbUri) return { message: "Dump Failed...!", status: false };
    const empty = await spawn("mongodump", ["--uri", dumpDbUri]);

    if (validatedDumpUri) return { message: "true", status: true };
    else return { message: "false", status: false };
  } catch (err) {
    console.log(err);
  }
};

//dynamic data restore db server to local
exports.mongodbRestore = async ({ body = {} }) => {
  try {
    const { uri, selectedFolder } = body;
    const validatedRestoreUri = dumpUriValidation(uri);
    const restoreDbName = uri.split("/");
    const fromPath = path.resolve("dump", selectedFolder);

    await restore.database({
      uri,
      database: restoreDbName[3],
      from: fromPath,
      clean: true,
      onCollectionExists: `overwrite`,
    });

    if (validatedRestoreUri)
      return { message: "Restore Success...!", status: true };
    else return { message: "Restore Failed..!", status: false };
  } catch (err) {
    return { message: err.message, status: false };
  }
};

//old codes

//mongodb dump and restore server to local
// exports.dumpDbDatabase = async () => {
//   try {
//     //dump mongodb database server to local file
//     const dumpdb = cmd.runSync(
//       `cd  ${process.env.MONGODUMP_PATH} && .\\mongodump --db=${process.env.MONGODUMP_DB_NAME} --uri ${process.env.MONGODB_URI}`
//     );

//     //restore mongodb database local file to local db
//     const restoredb = cmd.runSync(
//       `cd ${process.env.MONGORESTORE_PATH}  && .\\mongorestore --uri ${process.env.MONGORESTORE_URI}  --db=${process.env.MONGORESTORE_DB_NAME} ${process.env.MONGODUMP_EXISTING_PATH} `
//     );

//     if (dumpdb.err !== null && dumpdb.stderr !== null) {
//       return {
//         message: "mongodump Failed..! invalid path or invalid command...!",
//         status: false,
//       };
//     } else if (restoredb.err !== null && restoredb.stderr !== null) {
//       return {
//         message: "mongorestore Failed..! invalid path or invalid command...!",
//         status: false,
//       };
//     } else {
//       return {
//         message: "Mongodump and Mongorestore Successfully Completed ..!",
//         status: true,
//       };
//     }
//   } catch (err) {
//     console.log(err);
//     return { message: err.message, status: false };
//   }
// };

//dynamic data dump db server to local
// exports.mongodbDump = async ({ body = {} }) => {
//   try {
//     const { dumpDbUri, dumpDbName } = body;
//     const dumpdb = cmd.runSync(
//       `cd  ${process.env.MONGODUMP_PATH} && .\\mongodump --db=${dumpDbName} --uri ${dumpDbUri}`
//     );
//     console.log("dumpdb", dumpdb);
//     if (dumpdb.err !== null && dumpdb.stderr !== null) {
//       return {
//         message: dumpdb.err,
//         status: false,
//       };
//     } else {
//       return {
//         message: "Mongodump Successfully Completed ..!",
//         status: true,
//       };
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
