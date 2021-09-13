// import axios from "axios";
import { LOAD_SNAKE } from "./types";
// import {BASE_API_URL} from "../Api"
import {ArcadeScores1} from "../frontAPI"

/** GetSnake
 * 
 * action route used for dispatching highest score data for Snake game 
 * 
 * gets data of snake in the Database 
 * 
 */

function getSnake() {
  return async function (dispatch) {
    let snakeData = await ArcadeScores1.getSnake();
    let maxScore = snakeData[0].score;
    dispatch(gotScore(maxScore))
  }
}
// function getSnake() {
//   return async function (dispatch) {
//     const result = await axios.get(`${BASE_API_URL}/snake?_sort=score&_order=desc`);
//     let snakeData = result.data;
//     // for some reason it is not returning the highest score
//     // const maxScore = snakeData.reduce((a,b) => (a.score > b.score) ? a.score : b.score, 0);
//     let maxScore = snakeData[0].score;
//     dispatch(gotScore(maxScore));
//   };
// }

function gotScore(maxScore) {
  return { type: LOAD_SNAKE, payload: maxScore };
}

export { getSnake }