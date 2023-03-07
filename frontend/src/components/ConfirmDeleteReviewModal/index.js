import React, { useEffect } from 'react';
import * as reviewActions from '../../store/review';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeReview } from "../../store/review";
import { getSpotDetail } from '../../store/spot';
import { useModal } from '../../context/Modal';

const DeleteReview = ({reviewId, spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } =useModal()

    const deletedReview = async (e) => {
        e.preventDefault();
        await dispatch(removeReview(reviewId));
        await dispatch(getSpotDetail(spotId));
        closeModal();

        // await history.replace(`/api/spots/${spotId}`)
    };

    return (
        <>
        <h1>Confirm Delete</h1>
        <label>Are you sure you want to delete this review</label>
        <button onClick={deletedReview}>Yes (Delete Review)</button>
        <button onClick={closeModal}>No (Keep Review)</button>
        </>
    )
};

export default DeleteReview;
