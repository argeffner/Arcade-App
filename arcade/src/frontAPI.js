import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ArcadeScores1 {
  // the token for interactive with the API will be stored here.
  // If this app will require tokens, then the option is availabe below
  // static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    // console.log(`url: ${url}`)
    const headers = {'Content-Type': 'application/json'};
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

   /** Get snake Data. */

   static async getSnake() {
    let res = await this.request(`snake/`);
    // console.log('getsnake' +JSON.stringify(res));
    return res.snake;
  }

   /** Add new snake data to API */

  static async addSnake(newSnake) {
		const result = await axios.post(`${BASE_URL}/snake`, { ...newSnake });
    // console.log('getsnake' +JSON.stringify(result));
		return result.data;
	}

}

export default ArcadeScores1;

