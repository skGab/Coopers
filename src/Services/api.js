import axios from 'axios';

let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.GO_API_URL;
} else {
  baseURL = 'http://localhost:8080';
}

const api = axios.create({
  baseURL: baseURL,
});

export default api;
