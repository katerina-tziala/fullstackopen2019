import React from 'react';
import { useField } from '../hooks';

const PersonForm = (props) => {
    const name = useField('text');
    const number = useField('text');
  
    const handlePersonSubmit = (event) => {
        event.preventDefault();
        props.submitPerson({ name: name.value, number: number.value });
      };

    return (
        <form onSubmit={handlePersonSubmit}>
            name <input {...name} /> <br />
            number <input {...number} />
            <button>create</button>
        </form>
    );
};

export default PersonForm;