// import axios from "axios";
import { LOAD_SNAKE_ALL } from "./types";
// import {BASE_API_URL} from "../Api"
import {ArcadeScores1} from "../frontAPI"

/** GetSnake
 * 
 * action route used for dispatching highest score data for Snake game 
 * 
 * gets data of snake in the Database 
 * 
 */

 function getAllSnake() {
  return async function (dispatch) {
    let snakeData = await ArcadeScores1.getSnake();
    let allScores = snakeData;
    dispatch(gotAllScores(allScores))
  }
}

// function getAllSnake() {
//   return async function (dispatch) {
//     const result = await axios.get(`${BASE_API_URL}/snake?_sort=score&_order=desc`);
//     let allScores = result.data;
//     dispatch(gotAllScores(allScores))
//   };
// }

function gotAllScores(allScores) {
  return { type: LOAD_SNAKE_ALL, payload: allScores };
}


export { getAllSnake }