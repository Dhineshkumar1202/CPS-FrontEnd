import axios from 'axios';

// Create an instance of axios with the base URL from the environment variable
const API = axios.create({
  baseURL: 'http://localhost:5000', // Fallback to localhost
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export the axios instance
export default API;
