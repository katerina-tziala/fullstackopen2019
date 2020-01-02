import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationsReducer';

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        const selectedAnecdote = { ...anecdote };
        props.voteAnecdote(selectedAnecdote);
        props.setNotification(`You voted "${selectedAnecdote.content}"!`, 5);
    };

    return (
        <>
            {props.visibleAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
};

const getDisplayedAnecdotes = (anecdotes, filter) => {
    let newList = [...anecdotes];
    if (filter.length) {
        const filterParts = filter.split(' ');
        newList = newList.filter(anecdote => belongsInFilter(filterParts, anecdote.content));
    }
    return getSortedAnecdotesByVotes(newList);
};

const belongsInFilter = (filterParts, content) => {
    const contentParts = content.split(' ');
    const matches = filterParts.filter(value => -1 !== contentParts.indexOf(value));
    return (matches.length) ? true : false;
};

const getSortedAnecdotesByVotes = (anecdotesToSort) => {
    const newList = [...anecdotesToSort];
    return newList.sort((anecdoteA, anecdoteB) => (anecdoteA.votes < anecdoteB.votes) ? 1 : -1);
};

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: getDisplayedAnecdotes(state.anecdotes, state.filter),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        voteAnecdote: value => {
            dispatch(voteAnecdote(value))
        },
        setNotification: (value, seconds) => {
            dispatch(setNotification(value, seconds));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList);