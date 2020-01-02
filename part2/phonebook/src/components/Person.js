import React from 'react';
import Button from "./Button";

const Person = ({ person , deletePerson }) => {
    return (
        <div>
            <span>{person.name}  {person.number}</span>
            <Button handleClick={() => deletePerson(person.id)} text="delete" />
        </div>
        
    )
};

export default Person;