import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://labaapi-63.firebaseio.com/'
});

export default instance;