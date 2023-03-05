import React, { useEffect } from 'react';
import * as reviewActions from '../../store/review';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeReview } from "../../store/review";
import { getSpotDetail } from '../../store/spot';

const DeleteReview = ({reviewId, spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const deletedReview = async (e) => {
        e.preventDefault();
        await dispatch(removeReview(reviewId));
        await dispatch(getSpotDetail(spotId));

        // await history.replace(`/api/spots/${spotId}`)
    };

    return (
        <button onClick={deletedReview}>Delete Review</button>
    )
};

export default DeleteReview;
