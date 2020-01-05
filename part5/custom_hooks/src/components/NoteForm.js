import React from 'react';
import { useField } from '../hooks';

const NoteForm = (props) => {
    const content = useField('text');

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        props.submitNote({ content: content.value })
    };

    return (
        <form onSubmit={handleNoteSubmit}>
            <input {...content} />
            <button>create</button>
        </form>
    );
};

export default NoteForm;