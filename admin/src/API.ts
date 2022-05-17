import axios from 'axios';
// create axios instance with base url of api service 
let token = JSON.parse(localStorage.getItem('accessToken')as string)
const API = axios.create({
    baseURL:"http://localhost:4000/api/v1",
    headers:{
        'Content-Type':"applicaton/json",
        'Authorization': token
    }
})
export default API