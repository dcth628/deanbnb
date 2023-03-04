import React, { useEffect } from 'react';
import * as reviewActions from '../../store/review';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeReview } from "../../store/review";

const DeleteReview = ({reviewId, spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const deletedReview = async (e) => {
        e.preventDefault();
        dispatch(removeReview(reviewId));
        // await history.replace(`/api/spots/${spotId}`)
    };

    return (
        <button onClick={deletedReview}>Delete Review</button>
    )
};

export default DeleteReview;
