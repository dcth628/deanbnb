import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createReview, getAllReviews } from "../../store/review";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getSpotDetail } from "../../store/spot";
import './ReviewCreate.css'

const CreateReviewFrom = ({ spotId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);

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
            history.push(`/spots/${spotId}`);
        };
        dispatch(getSpotDetail(spotId));
       dispatch(getAllReviews(spotId));
    };

    const onChange = (e) => {
        setStars(e);
        // const number = e.target.value;
        // setRating(parseInt(number));
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        // history.push('/api/spots')
    };

    return (
        <section className="new-review-form-holder">
            <form className="create-review-form" onSubmit={handleSubmit}>
                <h1 className="review-title">How was your stay?</h1>
                <input
                className="review-input"
                    type="text"
                    placeholder="Please write a review"
                    required
                    value={review}
                    onChange={updateReview} />
                {/* <input
                    type="number"
                    placeholder="stars"
                    required
                    value={stars}
                    onChange={updateStars} /> */}

                <div className="rating-input">
                    <div onMouseEnter={() => setStars(1)}
                        onMouseLeave={() => setStars(stars)}
                        className={
                            stars >= 1
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(1)}
                    >
                    <i className="fa fa-heart"></i>
                    </div>
                    <div onMouseEnter={() => setStars(2)}
                        onMouseLeave={() => setStars(stars)}
                        className={
                            stars >= 2
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(2)}
                    >
                    <i className="fa fa-heart"></i>
                    </div>
                    <div onMouseEnter={() => setStars(3)}
                        onMouseLeave={() => setStars(stars)}
                        className={
                            stars >= 3
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(3)}
                    >
                    <i className="fa fa-heart"></i>
                    </div>
                    <div onMouseEnter={() => setStars(4)}
                        onMouseLeave={() => setStars(stars)}
                        className={
                            stars >= 4
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(4)}
                    >
                    <i className="fa fa-heart"></i>
                    </div>
                    <div onMouseEnter={() => setStars(5)}
                        onMouseLeave={() => setStars(stars)}
                        className={
                            stars >= 5
                                ? "filled"
                                : "empty"
                        }
                        onClick={() => onChange(5)}
                    >
                    <i className="fa fa-heart"></i>
                    </div>
                    Stars
                </div>
                <button className="review-button" type="submit">Create new Review</button>
                <button className="review-button" type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
};

export default CreateReviewFrom;
