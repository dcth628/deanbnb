import csrfFetch from "./csrf";

const LOAD_BOOKING = 'booking/LOAD_BOOKING'

const load = (list) => ({
    type: LOAD_BOOKING,
    list
});

export const getCurrentSpot = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`);
    if (response.ok) {
        const booking = await response.json();
        dispatch(load(booking));
        return booking;
    };
};


const initialState = {};

const bookingReduce = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKING:
            const allBookings = {};
            console.log(action)

        default:
            return state;
    }
}
