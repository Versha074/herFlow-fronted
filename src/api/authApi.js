import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // Expecting { user } or adjust based on your API
};

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data; // Expecting { user } or adjust based on your API
};