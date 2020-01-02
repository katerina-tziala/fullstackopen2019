import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import currentUserReducer from './reducers/currentUserReducer';
import notificationsReducer from './reducers/notificationsReducer';
import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
    users: usersReducer,
    currentUser: currentUserReducer,
    notification: notificationsReducer,
    blogs: blogsReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store;