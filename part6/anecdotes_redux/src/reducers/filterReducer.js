const initialState = '';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            const filter = action.data.filter;
            return filter;
        default:
            return state;
    }
};

export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        data: { filter }
    };
};

export default reducer;