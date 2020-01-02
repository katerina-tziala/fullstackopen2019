import usersService from '../services/usersService';
import blogsService from '../services/blogsService';
const actionHelper = require('../utils/actionHelper');

const reducer = (state = null, action) => {
    switch (action.type) {
    case 'LOGIN':
        state = action.data;
        return state;
    case 'LOGOUT':
        state = action.data;
        return state;
    case 'INIT_LOGGEDIN_USER':
        if (action.data !== null) {
            state = action.data;
        }
        return state;
    default:
        return state;
    }
};

const setAuthorizationForServices = (token) => {
    usersService.setToken(token);
    blogsService.setToken(token);
};

const resetAuthorizationForServices = () => {
    usersService.unsetToken();
    blogsService.unsetToken();
};

export const getLoggedInUser = () => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('loggedAppUser'));
    if (loggedInUser !== null) {
        setAuthorizationForServices(loggedInUser.token);
    }
    return dispatch => {
        dispatch({
            type: 'INIT_LOGGEDIN_USER',
            data: loggedInUser
        });
    };
};

export const loginUser = (credentials) => {
    return dispatch => {
        usersService.loginUser(credentials).then(user => {
            window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
            setAuthorizationForServices(user.token);
            dispatch({
                type: 'LOGIN',
                data: user
            });
        }).catch(error => {
            const message = error.response.data.error;
            const type = 'error';
            setTimeout(() => dispatch(actionHelper.getNotificationActionContent(null)), 8000);
            dispatch(actionHelper.getNotificationActionContent({ message, type }));
        });
    };
};

export const logoutUser = () => {
    window.localStorage.clear();
    resetAuthorizationForServices();
    return dispatch => {
        dispatch({
            type: 'LOGOUT',
            data: null
        });
    };
};

export default reducer;