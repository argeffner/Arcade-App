// "use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const PORT = +process.env.PORT || 4000;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "arcade_test"
      : process.env.DATABASE_URL || "arcade";
}

console.log("Jobly Config:".green);
console.log("PORT:".yellow, PORT.toString());
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  PORT,
  getDatabaseUri,
};
