import axios from 'axios';

let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://todo-api-l2m5.onrender.com';
} else {
  baseURL = 'http://localhost:8080';
}

const api = axios.create({
  baseURL: baseURL,
});

export default api;
