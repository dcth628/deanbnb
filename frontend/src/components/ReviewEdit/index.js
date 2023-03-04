import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editReview } from "../../store/review";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";


const EditReviewForm = ({reviews}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal } = useModal();
    // const { reviewId } = useParams();

    console.log(reviews, "333333333333333")
    let test = useSelector(state => {
        return Object.values(state.spot).map(spot => spot.id)})

    const [ review, setReview ] = useState(reviews.review);
    const [ stars, setStars ] = useState(reviews.stars);

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            spotId: test,
            id: reviews.id,
            review,
            stars
        };
        let updatedReview = await dispatch(editReview(newReview));
        if (updatedReview) {
            closeModal();
            // history.push(`/api/spots/${updatedReview.spotId}`)
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <section className="edit-review-form-holder">
            <h1>Edit Review</h1>
            <form className="edit-review-form" onSubmit={handleSubmit}>
                <input
                type='text'
                placeholder="Please write a review"
                required
                value={review}
                onChange={updateReview} />
                <input
                type="number"
                placeholder="Stars"
                required
                value={stars}
                onChange={updateStars} />
                <button type="submit">Update Review</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
};

export default EditReviewForm;
