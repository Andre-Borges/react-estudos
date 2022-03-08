import axios from 'axios';

// Ip do Backend
const api = axios.create({
  baseURL: 'http://192.168.0.10:3333',
});

export default api;
