const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFY':
            const message = action.data.message;
            return message;
        default:
            return state;
    }
};

export const setNotification = (message, seconds) => {
    const miliseconds = 1000 * seconds;
    return dispatch => {
        setTimeout(() => {
            return dispatch({
                type: 'NOTIFY',
                data:  { message: null }
            })
        }, miliseconds);
        dispatch({
            type: 'NOTIFY',
            data: { message }
        });
      };
};

export default reducer;