import axios from 'axios';

const base = process.env.NODE_ENV === 'development' ? 'mock-api' : 'api';

const api = axios.create({
  baseURL: `http://localhost:3000/${base}`,
});

export { api };
