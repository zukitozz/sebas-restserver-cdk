import axios from 'axios';

axios.defaults.timeout = 10000; 
const posApi = axios.create({
    baseURL: '/api'
});


export default posApi;