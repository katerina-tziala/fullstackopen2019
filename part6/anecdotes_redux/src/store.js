import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationsReducer from './reducers/notificationsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationsReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;