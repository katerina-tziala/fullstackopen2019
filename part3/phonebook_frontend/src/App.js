import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import phoneBookService from './services/phonebookService';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notification, setNotification] = useState(undefined);

    const notify = (notification) => {
        setNotification(notification);
        setTimeout(() => setNotification(undefined), 5000);
    };

    useEffect(() => {
        phoneBookService.getAll().then(initialPersons => setPersons(initialPersons));
    }, []);

    const handleFilterChange = (event) => setFilter(event.target.value);
    const handleNewNameChange = (event) => setNewName(event.target.value);
    const handleNewNumberChange = (event) => setNewNumber(event.target.value);

    const isBlank = (str) => !str || /^\s*$/.test(str);
    const personName = (person) => person.name.toLowerCase();

    const filterPersons = () => {
        let newPersonsList = [...persons];
        if (!isBlank(filter)) {
            newPersonsList = [...persons].filter(person => personName(person).includes(filter.toLowerCase()));
        }
        return newPersonsList.sort((personA, personB) => (personName(personA) < personName(personB)) ? -1 : (personName(personA) > personName(personB)) ? 1 : 0);
    };

    const savePerson = (event) => {
        event.preventDefault();
        const changedPerson = persons.find(person => person.name === newName);
        if (changedPerson) {
            if (window.confirm(`${changedPerson.name} is already added to phonebook replace the old number with the new one?`)) {
                updatePerson(changedPerson);
            }
        } else {
            createPerson();
        }
    };

    const getNotificationError = (message) => {
        return {
            type: 'error',
            message: message
        };
    };

    const getNotificationSuccess = (message) => {
        return {
            type: 'success',
            message: message
        };
    };

    const createPerson = () => {
        const newPerson = {
            name: newName.trim(),
            number: newNumber.trim()
        };
        phoneBookService.create(newPerson).then(addedPerson => {
            setPersons(persons.concat(addedPerson));
            setNewName('');
            setNewNumber('');
            notify(getNotificationSuccess(`${addedPerson.name} was successfully added to PhoneBook!`));
        }).catch(error => {
            notify(getNotificationError(error.response.data.error));
        });
    };

    const updatePerson = (changedPerson) => {
        changedPerson.number = newNumber.trim();
        phoneBookService.update(changedPerson.id, changedPerson).then(updatePerson => {
            setPersons([...persons].map(person => person.id !== updatePerson.id ? person : updatePerson));
            setNewName('');
            setNewNumber('');
            notify(getNotificationSuccess(`${updatePerson.name} was successfully updated!`));
        }).catch(() => {
            notify(getNotificationError(`${changedPerson.name} is already removed from PhoneBook!`));
        });
    };

    const deletePerson = id => {
        const personToDelete = persons.find(person => person.id === id);
        if (window.confirm(`Do you really want to delete ${personToDelete.name}?`)) {
            phoneBookService.deletePerson(id).then(() => {
                setPersons([...persons].filter(person => person.id !== id));
                notify(getNotificationSuccess(`${personToDelete.name} was successfully removed from PhoneBook!`));
            }).catch(() => {
                notify(getNotificationError('This person is already removed from PhoneBook!'));
            });
        }
    };

    const formSubmissionIsDisabled = () => {
        return (isBlank(newName) || isBlank(newNumber));
    };

    return (
        <>
            <h1>Phonebook</h1>
            <Notification notification={notification} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>Add New</h2>
            <PersonForm submission={savePerson} isDisabled={formSubmissionIsDisabled()} newName={newName} newNumber={newNumber} nameChange={handleNewNameChange} numberChange={handleNewNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={filterPersons()} deletePerson={deletePerson} />
        </>
    );
};

export default App;