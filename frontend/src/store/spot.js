import { csrfFetch } from "./csrf";

const LOAD_SPOT = 'spot/LOAD_SPOT';
const EDIT_SPOT = 'spot/EDIT_SPOT';
const CREATE_SPOT = 'spot/CREATE_SPOT';
const REMOVE_SPOT = 'spot/REMOVE_SPOT';
const GETONE_SPOT = 'spot/GETONE_SPOT';

export const load = (list) => ({
    type: LOAD_SPOT,
    list
});

const edit = (spot) => ({
    type: EDIT_SPOT,
    spot
});

const create = (spot) => ({
    type: CREATE_SPOT,
    spot
});

const remove = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
});

const getOne = (spot) => ({
    type: GETONE_SPOT,
    spot
})

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
        return list;
    };
};

export const getCurrentSpot = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(load(spot));
        return spot;
    };
};

export const getSpotDetail = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(getOne(spot));
        return spot
    }
}

export const editSpot = spot => async dispatch => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage} = spot;
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage,
        })
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(edit(spot));
        return spot
    };
};

export const createSpot = (spot) => async dispatch => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = spot;
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        })
    });
        const newSpot = await response.json();
        dispatch(create(newSpot));
        return newSpot;
};

export const removeSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(remove(spot));
        return spot;
    }
}

const initialState = { };

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOT:
            const allSpots = {};
                action.list.Spots.forEach(spot => {
                    allSpots[spot.id] = spot
                });
                return {
                    ...allSpots,
                };
        case EDIT_SPOT:
            const updateState = { ...state, [action.spot.id]: action.spot }
            return updateState
        case REMOVE_SPOT:
            const newState = { ...state };
            delete newState[action.spotId.id];
            return newState;
        case CREATE_SPOT:

            if (!state[action.spot.id]) {
                const createdState = {
                    ...state,
                    [action.spot.id]: action.spot
                };
                return createdState
            }
            return newState
        case GETONE_SPOT:
            return { [action.spot.id]: action.spot }
        default:
            return state;
    }
};

export default spotReducer;
