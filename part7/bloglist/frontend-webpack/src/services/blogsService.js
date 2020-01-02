import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

const setToken = (value) => {
    axios.defaults.headers.common = { 'Authorization': `bearer ${value}` };
};

const unsetToken = () => {
    delete axios.defaults.headers.common['Authorization'];
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
};

const deleteBlog = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response);
};
export default { setToken, unsetToken, getAll, create, update, deleteBlog };