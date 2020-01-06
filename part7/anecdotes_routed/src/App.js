import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import About from './components/About';
import AnecdoteList from './components/AnecdoteList';
import CreateAnecdote from './components/CreateAnecdote';
import Anecdote from './components/Anecdote';
import Notification from './components/Notification';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]);

  const [notification, setNotification] = useState('');

  const notify = (notification) => {
    setNotification(notification);
    setTimeout(() => setNotification(undefined), 10000);
  };

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    const message = `A new anecdote "${anecdote.content}" was created!`;
    notify({message});
  };

  const anecdoteById = (id) => {
    return [...anecdotes].find(a => a.id === id);
  };

  const padding = { padding: 5 };

  return (

    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <>
          <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/create">create</Link>
            <Link style={padding} to="/about">about</Link>
          </div>
          <Notification notification={notification} />
          <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" render={() => <CreateAnecdote addNew={addNew}/>} />
          <Route path="/about" render={() => <About />} />
          <Route exact path="/anecdotes/:id" render={({ match }) =>
            <Anecdote anecdote={anecdoteById(match.params.id)} />
          } />
        </>
      </Router>
    </div>

  )
};

export default App;