import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backend-studyacreator.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ici, vous pourrez ajouter des intercepteurs pour gérer
// l'authentification (tokens JWT), le logging, etc.

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
