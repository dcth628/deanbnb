import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editReview } from "../../store/review";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import './ReviewEdit.css'
import { getSpotDetail } from "../../store/spot";


const EditReviewForm = ({reviews}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal } = useModal();
    // const { reviewId } = useParams();
    const sessionUser = useSelector(state => state?.session.user)

    reviews = reviews.filter(review => review.userId === sessionUser.id)[0]
    let spotId = useSelector(state => {
        return Object.values(state.spot).map(spot => spot.id)})

    const [ review, setReview ] = useState(reviews.review);
    const [ stars, setStars ] = useState(reviews.stars);

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            spotId: spotId,
            id: reviews.id,
            review,
            stars
        };
        let updatedReview = await dispatch(editReview(newReview));
        if (updatedReview) {
            closeModal();
            dispatch(getSpotDetail(spotId))
            // history.push(`/api/spots/${updatedReview.spotId}`)
        }
    };

    const onChange = (e) => {
        setStars(e);
        // const number = e.target.value;
        // setRating(parseInt(number));
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
                {/* <input
                type="number"
                placeholder="Stars"
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
                </div>
                <button type="submit">Update Review</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
};

export default EditReviewForm;
