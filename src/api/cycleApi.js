import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const createCycle = async (credentials) => {
    const response = await axios.post(`${API_URL}/cycles`, credentials);
    return response.data;
};

export const getCycleByUserId = async (id) => {
    console.log(`${API_URL}/users/${id}/cycles`);
    const response = await axios.get(`${API_URL}/users/${id}/cycles`);
    return response.data;
}