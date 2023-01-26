import axios from "axios";

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