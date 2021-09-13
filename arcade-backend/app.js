/** Express Backend app for arcade. */

const express = require("express");
const cors = require("cors");

const ExpressError = require("./expressError");

const snakeRoutes = require("./routes/Snake");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/snake", snakeRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
