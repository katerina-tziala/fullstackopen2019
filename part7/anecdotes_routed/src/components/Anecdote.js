import React from 'react';
import Footer from './Footer';

const Anecdote = ({ anecdote }) => {
    return (
        <>
            <div>
                <h1>{anecdote.content}</h1>
                <h2>by {anecdote.author}</h2>
                <p>Has {anecdote.votes} votes</p>
            </div>
            <Footer />
        </>
    )
};

export default Anecdote;