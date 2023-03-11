import React, { useEffect } from 'react';
import * as reviewActions from '../../store/review';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeReview } from "../../store/review";
import { getSpotDetail } from '../../store/spot';
import { useModal } from '../../context/Modal';
import './ConfirmDeleteReviewModal.css'


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
        <div className='delete-form'>
        <h1 className="delete-title">Confirm Delete</h1>
        <div className="delete-confirm">Are you sure you want to delete this review</div>
        <button className="delete-button" onClick={deletedReview}>Yes (Delete Review)</button>
        <button className="delete-button" onClick={closeModal}>No (Keep Review)</button>
        </div>
        </>
    )
};

export default DeleteReview;
