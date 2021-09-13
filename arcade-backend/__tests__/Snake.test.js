process.env.NODE_ENV = "test"

const request = require("supertest");
const app = require("../app");
const db = require("../db");

//why Doesn't this work? Ask Ted.

describe("Snake Routes Test", function() {
    // create a book sample
    let samplePlayer;

    beforeEach(async function() {
        let result = await  db.query(
            `INSERT INTO snake (
                name, score)
             VALUES(
                'terry', 5)
                RETURNING name` );
        samplePlayer = result.rows[0].name;
    });

    describe('GET /snake',  function(){
        test("get all players from database", async () => {
          let response = await request(app)
          .get('/snake');
          // toHaveProperty checks for keypath or key and value
          expect(response.body.snake[0]).toHaveProperty('name');
          expect(response.body.snake[0]).toHaveProperty('score');
          expect(response.body).toEqual({
                snake: [
                    {name: 'terry',
                     score: 5 
                    } 
                ]
          })
        })
    })



    describe('GET /snake/:name',  () => {
        test('get the one snake based on name', async () => {
            let response = await request(app)
            .get(`/books/${samplePlayer}`)
            
            expect(response.body.snake.name).toEqual(samplePlayer);
            expect(response.body.snake).toHaveProperty('name');
        })

        test('wrong name', async function(){
            let response = await request(app)
            .get(`/snake/5`)
            expect(response.StatusCode).toEqual(404);
        })
    })



    describe('POST /snake',  () => {
        test('[post new snake data', async () => {
            let response = await request(app)
            .post('/snake')
            .send(
                {name: 'baba',
                 score: 12
                }
            )
            // status code 201 request successful and created a resource
            expect(response.body.snake).toHaveProperty('name');
            expect(response.StatusCode).toEqual(201);
        })

        test("not send all required keys and or values", async ()=> {
            let response = await request(app)
            .post('/snake')
            .send({score: 3})
            // bad post is a bad request status code 400
            expect(response.statusCode).toEqual(404)
        })
    })


    describe('PUT /snake/:name',  function(){
        test('update a book', async () =>{
          let repsonse = await request(app)
          .put(`/snake/${samplePlayer}`)
          .send({ score: 10 })
         expect(repsonse.body.snake.score).toEqual(10);
         expect(repsonse.body.snake).toHaveProperty('name');
        })

        test('added extra (name) to update error', async () =>{
          let repsonse = await request(app)
          .put(`/snake/${samplePlayer}`)
          .send({
              name: 'Terry',
              score: 12
         })
         expect(response.statusCode).toEqual(400)
        })

        test('incorrect name', async() => {
          let repsonse = await request(app)
          .put(`/snake/5`)
          expect(response.statusCode).toEqual(404) 
        })
    })


    describe('DELETE /snake/:name',  function(){
        test('Deletes a Player data', async ()=>{
            let response = await request(app)
            .delete(`/snake/${samplePlayer}`)

            expect(response.body).toEqual({ message: "Player data deleted" })
        })

        test('incorrect name', async ()=>{
            let response = await request(app)
            .delete('/snake/112')

            expect(response.statusCode).toEqual(404)
        })
    })
});
afterEach(async () => {
    await db.query("DELETE FROM snake");
});

afterAll(async function () {
    await db.end()
});