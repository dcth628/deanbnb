import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as spotActions from '../../store/spot';


const ConfirmDeleteSpotModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const deleteSpot = async (e) => {
    e.preventDefault();
    await dispatch(spotActions.removeSpot(spotId));
    closeModal();
    await dispatch(spotActions.getCurrentSpot());
    // history.replace('/spots/current');
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <label>Are you sure you want to delete this spot?</label>
      <button onClick={deleteSpot}>Yes (Delete Spot)</button>
      <button onClick={closeModal}>No (keepSpot)</button>
    </>
  )
};

export default ConfirmDeleteSpotModal;
