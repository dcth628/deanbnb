import { useDispatch } from "react-redux";
import csrfFetch from "./csrf";

const LOAD_REVIEW = 'review/LOAD_REVIEW';
const Edit_REVIEW = 'review/EDIT_REVIEW';
const CREATE_REVIEW = 'review/CREATE_REVIEW';
const REMOVE_REVIEW = 'review/REMOVE_REVIEW';


// const loadOne = (reviews) => ({
//     type: LOAD_REVIEW,
//     reviews
// });
// export const getAllReview = () => async dispatch => {
//     const response = await csrfFetch('/api/reviews');

//     if (response.ok) {
//         const list = await response.json();
//         dispatch(loadOne(list));
//         return list
//     }
// };



const load = (reviews, spot) => ({
    type: LOAD_REVIEW,
    reviews,
    spot
});

const edit = (review) => ({
    type: Edit_REVIEW,
    review,
});

const create = (review) => ({
    type: CREATE_REVIEW,
    review,
});

const remove = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})

export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list, spotId));
        return list;
    }
};

export const editReview = reviews => async dispatch => {
    const { review , stars } = reviews;
    const response = await csrfFetch(`/api/reviews/${reviews.id}`, {
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({
            review,
            stars
        })
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(edit(review));
        return review;
    };
};

export const createReview = (reviews) => async dispatch => {
    // console.log(reviews, "1111111111111")
    const { review, stars, spotId} = reviews;

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review,
            stars,
            spotId
        })
    });
    const newReview = await response.json();
    dispatch(create(newReview));
    return newReview
};

export const removeReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });


    if (response.ok) {
        const review = await response.json();
        dispatch(remove(review));
        return review;
    }
}

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEW:
            const allReviews = {};
            action.reviews.Reviews.forEach((review) => {
                allReviews[review.id] = review
            })
            // console.log(allReviews, "22222222222")
            return { ...allReviews };
        case Edit_REVIEW:
            // console.log(action, '11111111111111111')
            const updateState = { ...state, [action.review.id]: action.review}
            return updateState
        case CREATE_REVIEW:
            // console.log(action, '11111111111111111')
            if (!state[action.review.id]) {
            const createdState = {
                ...state,
                [action.review.id]: action.review
            };
            return createdState
        };
            return {...state};
        case REMOVE_REVIEW:
            const newState = {...state};
            delete newState[action.reviewId];
            return newState
        default:
            return state
    }
};

export default reviewReducer
