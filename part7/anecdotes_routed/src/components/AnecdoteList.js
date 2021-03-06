import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const AnecdoteList = ({ anecdotes }) => {
    return (
        <>
            <div>
                <h2>Anecdotes</h2>
                <ul>
                    {anecdotes.map(anecdote =>
                        <li key={anecdote.id}>
                            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                        </li>
                    )}
                </ul>
            </div>
            <Footer />
        </>
    );
};

export default AnecdoteList;