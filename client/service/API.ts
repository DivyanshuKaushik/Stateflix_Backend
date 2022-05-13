import axios from 'axios';
import Cookie from 'js-cookie';
// create axios instance with base url of api service 
const API = axios.create({
    baseURL:"http://localhost:4000/api/v1",
    headers:{
        'Authorization': Cookie.get('accessToken')
    }
})
export default API