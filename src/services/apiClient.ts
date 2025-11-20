import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backend-studyacreator.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ici, vous pourrez ajouter des intercepteurs pour gérer
// l'authentification (tokens JWT), le logging, etc.

export default apiClient;
