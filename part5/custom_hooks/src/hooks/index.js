import { useState } from 'react';
import axios from 'axios';

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
};

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);
  
    const getAll = () => {
        const request = axios.get(baseUrl);
        return request.then(response => setResources(response.data));
    };

    const create = resource => {
        const request = axios.post(baseUrl, resource);
        request.then(response => {
            setResources(resources.concat([response.data]))
        });
    };

    const service = {
        getAll,
        create
    };

    return [
        resources, service
    ];
};