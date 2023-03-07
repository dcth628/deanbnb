import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../store/spot";
import './SpotCreate.css'
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/review'

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [previewImage, setPreviewImage] = useState("");


    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        };

        let createdSpot = await dispatch(createSpot(newSpot));
        if (createdSpot) {
            dispatch(reviewActions.getAllReviews(createdSpot.id))
            closeModal();
            history.push(`/spots/${createdSpot.id}`);
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        history.push('/spots')
    };

    return (
        <section className="new-spot-form-holder">
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <input
                 type="text"
                 placeholder="Address"
                 required
                 value={address}
                 onChange={updateAddress} />
                 <input
                 type="text"
                 placeholder="City"
                 required
                 value={city}
                 onChange={updateCity} />
                 <input
                 type="text"
                 placeholder="State"
                 required
                 value={state}
                 onChange={updateState} />
                 <input
                 type="text"
                 placeholder="Country"
                 required
                 value={country}
                 onChange={updateCountry} />
                 <input
                 type="number"
                 placeholder="Latitude"
                 value={lat}
                 onChange={updateLat} />
                 <input
                 type="number"
                 placeholder="longitude"
                 value={lng}
                 onChange={updateLng} />
                 <input
                 type="text"
                 placeholder="Name"
                 required
                 value={name}
                 onChange={updateName} />
                 <input
                 type="text"
                 placeholder="Description"
                 required
                 value={description}
                 onChange={updateDescription} />
                 <input
                 type="number"
                 placeholder="Price"
                 required
                 value={price}
                 onChange={updatePrice} />
                 <input
                 type="text"
                 placeholder="PreviewImage"
                 required
                 value={previewImage}
                 onChange={updatePreviewImage} />
            <button type="submit">Create new Spot</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
};

export default CreateSpotForm;
