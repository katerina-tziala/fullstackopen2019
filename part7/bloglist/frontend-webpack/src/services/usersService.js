import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/users';
const loginUrl = 'http://localhost:3003/api/login';

const setToken = (value) => {
    axios.defaults.headers.common = { 'Authorization': `bearer ${value}` };
};

const unsetToken = () => {
    delete axios.defaults.headers.common['Authorization'];
};

const loginUser = (userCredentials) => {
    const request = axios.post(loginUrl, userCredentials);
    return request.then(response => response.data);
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

export default { setToken, unsetToken, getAll, loginUser };
