const initialState = {
    searchResults: [],
    error: '',
};

const flightReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBMIT_FLIGHT_DATA_SUCCESS':
            return {
                ...state,
                searchResults: action.payload,
                error: '',
            };
        case 'SUBMIT_FLIGHT_DATA_FAILURE':
            return {
                ...state,
                searchResults: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default flightReducer;