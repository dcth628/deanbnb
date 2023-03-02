import csrfFetch from "./csrf";

const LOAD_REVIEW = 'review/LOAD_REVIEW';
const Edit_REVIEW = 'review/EDIT_REVIEW';


const loadOne = (reviews) => ({
    type: LOAD_REVIEW,
    reviews
});

const edit = (review) => ({
    type: Edit_REVIEW,
    review,
});

export const getAllReview = () => async dispatch => {
    const response = await csrfFetch('/api/reviews');

    if (response.ok) {
        const list = await response.json();
        dispatch(loadOne(list));
        return list
    }
};

const load = (reviews, spot) => ({
    type: LOAD_REVIEW,
    reviews,
    spot
});

export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list, spotId));
        return list;
    }
};

export const editReview = (reviews) => async dispatch => {
    const { review , stars } = reviews;
    const response = await csrfFetch(`/api/reviews/${reviews.id}`, {
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({
            review,
            stars
        })
    });

    console.log(response, "222222222222222")
    if (response.ok) {
        const review = await response.json();
        dispatch(edit(review));
        return review;
    };

}

const initialState = [];

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEW:
            const allReviews = [];
            action.reviews.forEach((review) => {
                allReviews.push(review)
            })
            return { ...allReviews };
        case Edit_REVIEW:
            console.log(action)
            // const updateState = { ...state, [action.reviews.id]: action.reviews}
            // return updateState

        default:
            return state
    }
};

export default reviewReducer
