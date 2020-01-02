import anecdotesService from '../services/anecdotesService';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data;
      const newAnecdotes = [...state].map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote);
      return newAnecdotes;
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state;
  }
};

export const voteAnecdote = (anecdote) => {
  const newAnecdote = {...anecdote};
  newAnecdote.votes++;
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(newAnecdote.id, newAnecdote);
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    });
  }
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  }
};

export default reducer;