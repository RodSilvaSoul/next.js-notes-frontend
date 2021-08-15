import axios from 'axios';

const base = process.env.NODE_ENV === 'development' ? 'mock-api' : 'api';

const api = axios.create({
  baseURL: `http://localhost:8080/${base}`,
});

export { api };
