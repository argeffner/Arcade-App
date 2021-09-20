const express = require("express");
const Snake = require("../models/snakeModels");
const jsonschema = require("jsonschema");
const snakeSchema = require("../schemas/snakeSchema.json");
const updateSnakeSchema = require("../schemas/updateSnakeSchema.json");

const router = new express.Router();

/**
 * Create CRUD Routes for setup of the front end
 * 
 * possibility that not all the routes will be used for the app at the moment
 * but possibly changes will be made to the front-end in the future which will utlilize all the routes.
 */

/** GET / => {snake: [snakedata, ...]}  */

router.get("/", async function (req, res, next) {
  try {
    const snake = await Snake.findAll(req.query);
    return res.json({ snake });
  } catch (err) {
    return next(err);
  }
});

/** GET /[name]  => {name: name} */
// Need to determine if I need this route at all

// router.get("/:name", async function (req, res, next) {
//   try {
//     const snake = await Snake.findOne(req.params.name);
//     return res.json({ snake });
//   } catch (err) {
//     return next(err);
//   }
// });

/** POST /   snakeData => {snake: snakeData}  */

router.post("/", async function (req, res, next) {
  try {
    const result = jsonschema.validate(req.body, snakeSchema);
    if (!result.valid) {
    let errorList = result.errors.map(e => e.stack);
    let error = new ExpressError(errorList, 400);
    return next(error);
    }
    const snake  = Snake.create(req.body);
    return res.status(201).json({ snake });
  } 
  catch (err) {
    return next(err);
  }
});

/** PUT /[name]   snakeData => {snake: updateSnake}  */
// May use route in case spefic login user is created 

// router.put("/:name", async function (req, res, next) {
//   try {
//     // make sure that name is not in the updated version
//     if ("name" in req.body) {
//       let error = new ExpressError("Can't have existing name", 400);
//       return next(error);
//     }
//     const result = jsonschema.validate(req.body, updateSnakeSchema);
//     if (!result.valid) {
//       let errorList = result.errors.map(e => e.stack);
//       let error = new ExpressError(errorList, 400);
//       return next(error);
//       }
//     const snake = await Snake.update(req.params.name, req.body);
//     return res.json({ snake });
//   } catch (err) {
//     return next(err);
//   }
// });

/** DELETE /[name]   => {message: "Player data deleted"} */
// Delete route not needed at the moment

// router.delete("/:name", async function (req, res, next) {
//   try {
//     await Snake.remove(req.params.name);
//     return res.json({ message: "Player data deleted" });
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = router;
