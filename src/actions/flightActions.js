import axios from 'axios';

export const submitFlightData = (data) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:2800/date', data);
        dispatch({
            type: 'SUBMIT_FLIGHT_DATA_SUCCESS',
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: 'SUBMIT_FLIGHT_DATA_FAILURE',
            payload: error.message,
        });
    }
};