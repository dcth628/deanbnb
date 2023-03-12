import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as spotActions from '../../store/spot';
import './ConfirmDeleteSpotModal.css'


const ConfirmDeleteSpotModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const deleteSpot = async (e) => {
    e.preventDefault();
    await dispatch(spotActions.removeSpot(spotId));
    closeModal();
    await dispatch(spotActions.getCurrentSpot());
  };

  return (
    <>
    <div className="delete-form">
      <h1 className="delete-title">Confirm Delete</h1>
      <div className="delete-confirm">Are you sure you want to remove this spot from the listing?</div>
      <button className="delete-button" onClick={deleteSpot}>Yes (Delete Spot)</button>
      <button className="delete-button" onClick={closeModal}>No (keepSpot)</button>
    </div>
    </>
  )
};

export default ConfirmDeleteSpotModal;
