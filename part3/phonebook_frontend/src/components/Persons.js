import React from 'react';
import Person from './Person';

const Persons = ({ persons, deletePerson }) => {
    const displayPersons = () => persons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />);
    return (
        <div>
            {displayPersons()}
        </div>
    );
};

export default Persons;