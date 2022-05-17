import axios from 'axios';
// create axios instance with base url of api service 
const API = axios.create({
    baseURL: process.env.NODE_ENV==='production' ? process.env.API_URL_PROD : process.env.API_URL_DEV,
})
export default API