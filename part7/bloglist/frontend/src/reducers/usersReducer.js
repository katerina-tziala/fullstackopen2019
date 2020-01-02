import usersService from '../services/usersService';

const reducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_USERS':
        state = action.data;
        return state;
    default:
        return state;
    }
};

export const getAllUsers = () => {
    return dispatch => {
        usersService.getAll().then(allUsers => {
            dispatch({
                type: 'INIT_USERS',
                data: allUsers
            });
        }).catch(error => {
            console.log(error);
        });
    };
};

export default reducer;