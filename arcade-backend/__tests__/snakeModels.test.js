"use strict";

const db = require("../db");
const ExpressError = require("../expressError");
const snakeM = require("../models/snakeModels");


describe("Test Snake class", function () {

  beforeEach(async function () {
    await db.query("DELETE FROM snake");

    await db.query(`
    INSERT INTO snake (name, score)
    VALUES ('charlie', 5),
           ('willy', 2),
           ('wonka', 13)`);
  });

  let s1 = {
    name: "test1",
    score: 2
  };

  /************************************** create */

    test("can create", async function () {
      let newsnake = await SnakeM.create(s1);
      expect(newsnake).toEqual({
          name: "test1",
          score: 2
      });
  
      const result = await db.query(
          `SELECT name, score FROM snake
           WHERE name = 'test1'`);
      expect(result.rows).toEqual([
        {
          name: "test1",
          score: 2
        },
      ]);
    });
  
    test("bad request with dupe", async function () {
      try {
        await SnakeM.create(s1);
        await SnakeM.create(s1);
        fail();
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });

  /************************************** findAll */
  
    test("works: all", async function () {
      let players = await SnakeM.findAll();
      expect(players).toEqual([
        {
          name: "charlie",
          score: 5,
          logoUrl: "http://c1.img",
        },
        {
          name: "willy",
          score: 2,
        },
        {
          name: "wonka",
          score: 13,
        },
      ]);
    });

/************************************** findOne */

  test("find by name", async function () {
    let player = await SnakeM.findOne(wonka);
    expect(player).toEqual([
      {
        name: "wonka",
        score: 13,
      },
    ]);
  });

  test("not found if no such name", async function () {
    try {
      await SnakeM.findOne("nope");
      fail();
    } catch (err) {
      expect(err instanceof ExpressError).toBeTruthy();
    }
  });

/************************************** update */

  describe("update", function () {
    const updateData = {
      name: "test1",
      score: 10,
    };

    test("works", async function () {
        let player = await SnakeM.update("test1", updateData);
        expect(player).toEqual({
          ...updateData,
        });
    
        const result = await db.query(
              `SELECT name, score
               FROM snake
               WHERE name = 'test1'`);
        expect(result.rows).toEqual([{
          name: "test1",
          score: 10,
        }]);
    });
  
    test("not found if no such name", async function () {
      try {
        await SnakeM.update("nope", updateData);
        fail();
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  })
/************************************** remove */
  describe("remove", function () {
    test("works", async function () {
      await SnakeM.remove("willy");
      const res = await db.query(
          "SELECT name FROM snake WHERE name='willy'");
      expect(res.rows.length).toEqual(0);
    });
  
    test("not found if no such player", async function () {
      try {
        await SnakeM.remove("nope");
        fail();
      } catch (err) {
        expect(err instanceof ExpressError).toBeTruthy();
      }
    });
  });

  afterAll(async function() {
    await db.end();
  });
});
