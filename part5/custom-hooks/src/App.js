import React, { useEffect } from 'react';
import { useResource } from './hooks';
import NoteForm from './components/NoteForm';
import PersonForm from './components/PersonForm';

const App = () => {
  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  useEffect(() => {
    noteService.getAll();
    personService.getAll();
  }, []);


  const submitNote = (note) => {
    noteService.create(note);
  };

  const submitPerson = (person) => {
    personService.create(person);
  };

  return (
    <div>
      <h2>notes</h2>
      <NoteForm submitNote={submitNote} />
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <PersonForm submitPerson={submitPerson} />
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App