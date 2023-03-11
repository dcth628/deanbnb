import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSpot, getSpotDetail } from '../../store/spot';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as reviewActions from '../../store/review';
import { createSpotImage } from "../../store/image";
import './SpotEdit.css'

const EditSpotForm = ({spot}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [previewImage, setPreviewImage] = useState(spot.previewImage);
    let spotImage1 = ""
    if (spot.SpotImages.length >= 1) spotImage1 = spot.SpotImages[0].url
    const [url1, setUrl1] = useState(spotImage1);
    let spotImage2 = ""
    if (spot.SpotImages.length >= 2) spotImage2 = spot.SpotImages[1].url
    console.log(spotImage2)
    const [url2, setUrl2] = useState(spotImage2);
    let spotImage3 = ""
    if (spot.SpotImages.length >=3 ) spotImage3 = spot.SpotImages[2].url
    const [url3, setUrl3] = useState(spotImage3);

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
    const updatedUrl1 = (e) => setUrl1(e.target.value);
    const updatedUrl2 = (e) => setUrl2(e.target.value);
    const updatedUrl3 = (e) => setUrl3(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSpot = {
            id: spot.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage,
        };
        const newImage = [
            url1,
            url2,
            url3,
        ];

        let updatedSpot = await dispatch(editSpot( newSpot, ));
        if (updatedSpot) {
            dispatch(reviewActions.getAllReviews(updatedSpot.id))
            closeModal();
            // history.push(`/api/spots/${updatedSpot.id}`);
        }
        await dispatch(getSpotDetail(spot.id))
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        // history.push('/api/spots')
    };

    return (
        <section className="edit-spot-form-holdeer">
            <form className="edit-spot-form" onSubmit={handleSubmit}>
            <div className="form-list">
                    <h1 className="edit-spot-title">Update your spot</h1>
                    <div className="createspot-box">
                        <div className="createspot-text">Address</div>
                        <input className="create-spot-input"
                            type="text"
                            placeholder="Address"
                            required
                            value={address}
                            onChange={updateAddress} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text">City</div>
                        <input className="create-spot-input"
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={updateCity} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text">State</div>
                        <input className="create-spot-input"
                            type="text"
                            placeholder="State"
                            required
                            value={state}
                            onChange={updateState} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text">Country</div>
                        <input className="create-spot-input"
                            type="text"
                            placeholder="Country"
                            required
                            value={country}
                            onChange={updateCountry} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text">Latitude</div>
                        <input className="create-spot-input"
                            type="number"
                            placeholder="Latitude"
                            step={0.01}
                            min={0}
                            value={lat}
                            onChange={updateLat} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text">longitude</div>
                        <input className="create-spot-input"
                            type="number"
                            placeholder="longitude"
                            step={0.01}
                            min={0}
                            value={lng}
                            onChange={updateLng} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text">Name</div>

                        <input className="create-spot-input"
                            type="text"
                            placeholder="Name"
                            required
                            value={name}
                            onChange={updateName} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text">Description</div>
                        <input className="create-spot-input-description"
                            type="text"
                            placeholder="Description"
                            required
                            value={description}
                            onChange={updateDescription} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text">Price</div>
                        <input className="create-spot-input"
                            type="number"
                            placeholder="Price"
                            min={0}
                            required
                            value={price}
                            onChange={updatePrice} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text">Images</div>
                        <input className="create-spot-input"
                            type="url"
                            placeholder="PreviewImage "
                            required
                            value={previewImage}
                            onChange={updatePreviewImage} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text"> Boost your spot!</div>
                        <input className="create-spot-input-pic"
                            type="url"
                            placeholder="Url 1 "
                            value={url1}
                            onChange={updatedUrl1} />
                        <input className="create-spot-input-pic"
                            type="url"
                            placeholder="Url 2 "
                            value={url2}
                            onChange={updatedUrl2} />
                        <input className="create-spot-input-pic"
                            type="url"
                            placeholder="Url 3 "
                            value={url3}
                            onChange={updatedUrl3} />

                    </div>

                    <button className="createspot-button" type="submit">Update Your Spot</button>
                    <button className="createspot-button" type="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </section>
    )
};

export default EditSpotForm;
