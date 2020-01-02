import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({anecdote, votes}) => {
    return (
        <>
            <p>{anecdote}</p>
            <p><i>Has {votes} votes.</i></p>
        </>
    )  
};

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
);

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);

  const displayNextAnecdote = () => {
      const newSelected = Math.floor(Math.random() * anecdotes.length);
      if (selected === newSelected) {
        displayNextAnecdote();
      } else {
        setSelected(newSelected);
      }
  };

  const setAnecdoteVotes = (selected) => {
    const anecdotesPoints = [...votes];
    anecdotesPoints[selected] = anecdotesPoints[selected] + 1;
    return setVotes(anecdotesPoints);
  };

  const getMaxVotesPosition = () => {
    const anecdotesPoints = [...votes];
    return anecdotesPoints.indexOf(Math.max(...anecdotesPoints));
  };

  return (
      <>
        <div>
            <h1>Anecdote of the day</h1>
            <Display anecdote={props.anecdotes[selected]} votes={votes[selected]}/>
            <Button handleClick={() => setAnecdoteVotes(selected)} text="vote" />
            <Button handleClick={() => displayNextAnecdote()} text="next anecdote" />
        </div>
        <div>
            <h1>Anecdote with most votes</h1>
            <Display anecdote={props.anecdotes[getMaxVotesPosition()]} votes={votes[getMaxVotesPosition()]}/>
        </div>
     </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)