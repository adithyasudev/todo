import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const register = (username, password) => {
    return axios.post(`${API_URL}/users/register`, { username, password });
};

const login = (username, password) => {
    return axios.post(`${API_URL}/users/login`, { username, password });
};

export { register, login };
