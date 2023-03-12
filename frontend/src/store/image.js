import { csrfFetch } from "./csrf";

// const LOAD_IMAGE = 'image/LOAD_IMAGE';
// const EDIT_IMAGE = 'image/EDIT_IMAGE';
const CREATE_IMAGE = 'image/CREATE_IMAGE';

// const load = (list) => ({
//     type: LOAD_IMAGE,
//     list
// });


// const edit = (spotId) => ({
//     type: EDIT_IMAGE,
//     spotId
// });

const create = (image) => ({
    type: CREATE_IMAGE,
    image
});

export const createSpotImage = (imageArray, spotId) => async dispatch => {
    // const { url, imageId } = image;
    imageArray.forEach( async (image) => {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url: image,
                imageId: spotId,
            })
        });
        const newImage = await response.json();
        dispatch(create(newImage));
    })
};


const initialState = {};

const imageReducer = (state = initialState, action) => {
    switch (action.type){
        case CREATE_IMAGE:
            const newState = {
                ...state,
                [action.image.id]: action.image
            };
            return newState;
            default:
                return state
    }
};

export default imageReducer;
