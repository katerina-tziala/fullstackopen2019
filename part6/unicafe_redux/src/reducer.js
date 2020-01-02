const initialState = {
    good: 0,
    ok: 0,
    bad: 0
};

const getNewState = (previousState, keyToIncrement) => {
    const newState = { ...previousState };
    newState[keyToIncrement] += 1;
    return newState;
};



const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GOOD':
            state = getNewState(state, 'good');
            return state;
        case 'OK':
            state = getNewState(state, 'ok');
            return state;
        case 'BAD':
            state = getNewState(state, 'bad');
            return state;
        case 'ZERO':
            state = { ...initialState };
            return state;
        default:
            return state;
    }
};

export default counterReducer;