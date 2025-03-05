import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const createCycle = async (credentials) => {
    const response = await axios.post(`${API_URL}/cycles`, credentials);
    return response.data;
};