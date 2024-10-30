import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFights = () => api.get('/fights');
export const createFight = (data: any) => api.post('/fights', data);
export const voteFight = (fightId: string, fighterNumber: 1 | 2) => 
  api.post('/fights/vote', { fightId, fighterNumber });

export const getFighters = () => api.get('/fighters');
export const createFighter = (data: FormData) => 
  api.post('/fighters', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const login = (email: string, password: string) =>
  api.post('/users/login', { email, password });

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};