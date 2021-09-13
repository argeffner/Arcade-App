const db = require("../db");
const ExpressError = require("../expressError");


/** Data for all scores and names from snake game. */

class Snake {
  /** given a playername, return snake data with that name:
   *
   * => {name, score}
   *
   **/

  static async findOne(playername) {
    const snakeRes = await db.query(
        `SELECT name,
                score
            FROM snake 
            WHERE name = $1`, [playername]);

    if (snakeRes.rows.length === 0) {
      throw new ExpressError(`There is no player with name: ${playername}`, 404)
    }

    return snakekRes.rows[0];
  }

  /** Return array of snake data:
   *
   * => [ {name, score}, ... ]
   *
   * */

  static async findAll() {
    const snakeRes = await db.query(
        `SELECT name,
                score
            FROM snake 
            ORDER BY score DESC`);

    return snakeRes.rows;
  }

  /** create player data in database from data, return snake data:
   *
   * {name, score}
   *
   * => {name, score}
   *
   * Throws BadRequestError if name already in database.
   * */

  static async create(data) {
    const result = await db.query(
      `INSERT INTO snake (
            name,
            score) 
         VALUES ($1, $2) 
         RETURNING name,
                   score`, [data.name, data.score]);
    
    const duplicateCheck = await db.query(
          `SELECT name
           FROM snake
           WHERE name = $1`,
        [data.name]);

    if (duplicateCheck.rows[0])
      throw new ExpressError(`Duplicate name: ${data.name}`, 400);

    return result.rows[0];
  }

  /** Update data with matching name to data, return updated snakedata.

   * {name, score}
   *
   * => {name, score}
   *
   * */

  static async update(name, data) {
    const result = await db.query(
      `UPDATE snake SET 
            score=($1),
            WHERE name=$2
        RETURNING name,
                  score`,
      [
        data.score,
        name
      ]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`There is no player with name: ${name}`, 404)
    }

    return result.rows[0];
  }

   /** Delete given snakedata from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(name) {
    const result = await db.query(
      `DELETE FROM snake 
         WHERE name = $1 
         RETURNING name`,
        [name]);

    if (result.rows.length === 0) {
      throw new ExpressError(`There is no player with name: ${name}`, 404)
    }
  }
}


module.exports = Snake;
