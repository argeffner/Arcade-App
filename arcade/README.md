# Arcade App
Capstone 2 for Springboard

This project is deployed [here](), using Heroku and Surge.sh.

## Description

The Arcade App is used to play a number of retro arcade games (more will be added in later) which currently includes the snake game. Players who got a score highers than the existing highest score will have the ability to but in their name or anything they choose as thier player name. Players get to experience lsiting to retro game music for each game, including the main page, and can see order of scores for each game at the home page.

## Features

Currently implemented features include:
- Collection of players and scores, including getting new scores like arcades
- Ability to listen to the background music, and to turn off if one chooses
- Easy return to home page at any point in time during game play

These features were what I considered the minimum viable product. More will be added in time.

## Tests

The backend can be tested by navigating to the /arcade-backend/ folder and running `jest -i`. The frontend can be tested (after running `npm install`) using `npm test`.

## Example user flow

User simply enters the homepage and gets to navigate through a selection of retro games. Part of the homepage includes data that is retreived from the backend API using Redux. This allows player to so all scores from each game. Once individual selects a game they are sent to the route for game they chose. The Game's page will have the player's score located at the top right window which will change dynamically based on gaining points in the game. Once player clicks the start game, they will keep increasing personal score. At the end of the game, user will get to see the highscore of the game and personal high score. If indiviual's score is higher than the highest score then they will get a small imput box to put the player name they choose. The player can add name with personal high score by hitting the submit button and restart game or they can choose to not to submit data by simply clicking the restart without hitting the submit button.

## API 

Initially, this project this project was supposed to include PacMan but it will take more time to work in order to deploy the front end. I used my own API using Express.js to store the scores. I started by designing the database schema, then by implementing basic models for each of the main types of object (snake, pacman, other games). I simply added basic "CRUD" functionality for each model, but I will likely implement changes that will make more complex interactions. I then finished by coding routes for each game (at the moment it only includes the snake game), corresponding to the functions I had implemented to them.

## Technology stack

The front end was built using Node.js, and specifically using React.js. I used libraries including react-router-dom, react-bootstrap, and axios.

The back end was also built using Node.js, and in this case with Express.js. The database is PostgreSQL, with node-pg used as a library to link the database and the Express server.