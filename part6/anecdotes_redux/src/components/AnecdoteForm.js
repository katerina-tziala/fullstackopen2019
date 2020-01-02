import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationsReducer';

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.content.value;
        event.target.content.value = '';
        props.createAnecdote(content);
        props.setNotification(`You added "${content}"!`);
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="content" /></div>
                <button>create</button>
            </form>
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        createAnecdote: value => {
            dispatch(createAnecdote(value))
        },
        setNotification: (value, seconds) => {
            dispatch(setNotification(value, seconds));
        }
    }
};

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm);