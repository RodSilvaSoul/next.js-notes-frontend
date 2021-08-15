import axios from 'axios';

const fakerApi = 'http://localhost:3001';

const url = process.env.NODE_ENV === 'development' ? fakerApi : process.env.API_URL;

const api = axios.create({
  baseURL: url,
});

export { api };
