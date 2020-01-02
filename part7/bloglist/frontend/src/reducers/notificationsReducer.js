const actionHelper = require('../utils/actionHelper');
const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NOTIFY':
        state = action.data;
        return state;
    default:
        return state;
    }
};

export const setNotification = (notification, seconds) => {
    const miliseconds = 1000 * seconds;
    return dispatch => {
        setTimeout(() => dispatch(actionHelper.getNotificationActionContent(initialState)), miliseconds);
        dispatch(actionHelper.getNotificationActionContent(notification));
    };
};

export const clearNotification = () => {
    return dispatch => {
        dispatch(actionHelper.getNotificationActionContent(initialState));
    };
};

export default reducer;