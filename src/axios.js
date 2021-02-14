import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://localhost:5001/divine-mens-fashion/us-central1/api' ///THE API
});

export default instance;