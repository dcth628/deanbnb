import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../store/spot";
import './SpotCreate.css'
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/review'
import { createSpotImage } from "../../store/image";

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");
    const [errors, setErrors ] = useState([]);


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
        const newImage = [
            url1,
            url2,
            url3,
        ];

        let createdSpot = await dispatch(createSpot(newSpot));
        await dispatch(createSpotImage(newImage, createdSpot.id));
        if (createdSpot) {
            dispatch(reviewActions.getAllReviews(createdSpot.id))
            closeModal();
            history.push(`/spots/${createdSpot.id}`);
        }
    };

    const onError = async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
    }


    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        history.push('/')
    };

    return (
        <section className="new-spot-form-holder">
            <form className="create-spot-form" onSubmit={(handleSubmit, onError)}>
                <div className="form-list">
                    <h1 className="create-spot-title">Create a new Spot</h1>
                    <ul>
                    {errors.map((error, idx) =>
                        <li key={idx}>{error}</li>
                    )}
                </ul>
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
                            step={0.0000001}
                            min={0}
                            value={lat}
                            onChange={updateLat} />
                    </div>
                    <div className="createspot-box">
                        <div className="createspot-text">longitude</div>
                        <input className="create-spot-input"
                            type="number"
                            placeholder="longitude"
                            step={0.0000001}
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
                            step={0.01}
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

                    <button className="createspot-button" type="submit">Create new Spot</button>
                    <button className="createspot-button" type="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </section>
    )
};

export default CreateSpotForm;
