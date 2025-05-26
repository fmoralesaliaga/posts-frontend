import axios from 'axios';

// Configuración de base URL para API
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de tiempo de espera
});

// Interceptor para manejar solicitudes
api.interceptors.request.use(
  (config) => {
    // Aquí podemos agregar lógica como tokens de autenticación si fuera necesario
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo centralizado de errores
    // Extract error message if needed
    error.response?.data?.message || error.message || 'Ocurrió un error desconocido';
    
    // Podríamos agregar lógica específica según el código de estado
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('No autorizado');
          break;
        case 403:
          console.log('Acceso prohibido');
          break;
        case 404:
          console.log('Recurso no encontrado');
          break;
        case 500:
          console.log('Error del servidor');
          break;
        default:
          console.log(`Error: ${error.response.status}`);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
