import axios from "axios";
import Cookies from "js-cookie";
// console.log(process.env.STATEFLIX_API_KEY);
// const API = axios.create({
//     baseURL: api_config.baseURL,
//     headers:{
//         "Content-Type": "application/json",
//         "x-api-key":api_config.apiKey,
//         "Authorization":Cookies.get("accessToken"),
//     }
// });

// const API = axios.create({
//     baseURL: "https://stateflix.vercel.app/api/v1",
//     headers:{
//         "Content-Type": "application/json",
//         "x-api-key":"bpqt4p1xopc84phluh5kzxp01h1fq0",
//         "Authorization":Cookies.get("accessToken")
//     }
// });
const API = axios.create({
    baseURL: process.env.STATEFLIX_API_URI,
    headers:{
        "Content-Type": "application/json",
        "x-api-key":process.env.STATEFLIX_API_KEY,
        // "Authorization":Cookies.get("accessToken"),
        "Access-Control-Allow-Credentials":true,
    },
});

API.defaults.withCredentials = true;
export default API;