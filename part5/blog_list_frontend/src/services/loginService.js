import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/login';

const loginUser = (userCredentials) => {
    const request = axios.post(baseUrl, userCredentials);
    return request.then(response => response.data);
};

export default { loginUser };