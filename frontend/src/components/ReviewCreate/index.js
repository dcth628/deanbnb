import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/review";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getSpotDetail } from "../../store/spot";

const CreateReviewFrom = ({spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            spotId: spotId,
            review,
            stars
        };

        let createdReview = await dispatch(createReview(newReview));
        if (createdReview) {
            closeModal();
            history.push(`/spots/${createdReview.spotId}`);
        };
        dispatch(getSpotDetail(spotId))
    };


    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        // history.push('/api/spots')
    };

    return (
        <section className="new-review-form-holder">
            <form className="create-review-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Write a review"
                    required
                    value={review}
                    onChange={updateReview} />
                <input
                    type="number"
                    placeholder="stars"
                    required
                    value={stars}
                    onChange={updateStars} />
                <button type="submit">Create new Review</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
};

export default CreateReviewFrom;
