const { spawn } = require("child_process");
const restore = require("mongodb-restore-dump");
const path = require("path");
const fs = require("fs");

const { dumpUriValidation } = require("../../../utils/validation");

//show all dumped database name list
exports.showAllDatabaseNames = async () => {
  try {
    const FolderNames = fs.readdirSync(path.resolve("dump"));
    return { message: FolderNames, status: true };
  } catch (err) {
    console.log(err);
    return { message: err.message, status: false };
  }
};

//dump database
exports.mongodbDump = async ({ body = {} }) => {
  try {
    const { dumpDbUri } = body;

    const validatedDumpUri = dumpUriValidation(dumpDbUri);

    if (!dumpDbUri) return { message: "Dump Failed...!", status: false };

    spawn("mongodump", ["--uri", dumpDbUri]);

    if (validatedDumpUri) return { message: "Dump Success...!", status: true };
    else return { message: "Dump Failed...!", status: false };
  } catch (err) {
    console.log(err);
  }
};

//restore database
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
