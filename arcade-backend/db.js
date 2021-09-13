"use strict";
/** Database setup for arcade. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db = new Client({
    connectionString: getDatabaseUri()
  });

db.connect();

module.exports = db;