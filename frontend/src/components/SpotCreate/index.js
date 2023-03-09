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


    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        history.push('/spots')
    };

    return (
        <section className="new-spot-form-holder">
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <div className="form-list">
                    <div>
                        <div className="address">Address</div>
                        <div>
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={updateAddress} />
                        </div>
                    </div>
                    <div>
                        City
                    </div>
                    <div>

                        <input className="city"
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={updateCity} />
                    </div>
                    <div>
                        State
                    </div>

                    <div>
                        <input className="state"
                            type="text"
                            placeholder="State"
                            required
                            value={state}
                            onChange={updateState} />
                    </div>
                    <div>
                        Country
                    </div>
                    <div>

                        <input className="country"
                            type="text"
                            placeholder="Country"
                            required
                            value={country}
                            onChange={updateCountry} />
                    </div>
                    <div>
                        Latitude
                    </div>
                    <div>

                        <input className="lat"
                            type="number"
                            placeholder="Latitude"
                            value={lat}
                            onChange={updateLat} />
                    </div>
                    <div>
                        longitude
                    </div>
                    <div>

                        <input className="lng"
                            type="number"
                            placeholder="longitude"
                            value={lng}
                            onChange={updateLng} />
                    </div>
                    <div>
                        Name
                    </div>
                    <div>

                        <input className="name"
                            type="text"
                            placeholder="Name"
                            required
                            value={name}
                            onChange={updateName} />
                    </div>
                    <div>
                        Description
                    </div>
                    <div>

                        <input className="description"
                            type="text"
                            placeholder="Description"
                            required
                            value={description}
                            onChange={updateDescription} />
                    </div>
                    <div>
                        Price
                    </div>
                    <div>

                        <input className="price"
                            type="number"
                            placeholder="Price"
                            required
                            value={price}
                            onChange={updatePrice} />
                    </div>
                    <div>
                        Images
                    </div>
                    <div>

                        <input className="previewimage"
                            type="text"
                            placeholder="PreviewImage "
                            required
                            value={previewImage}
                            onChange={updatePreviewImage} />
                    </div>
                    <div>
                        Boost your spot!
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder="Url 1 "
                            required
                            value={url1}
                            onChange={updatedUrl1} />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder="Url 2 "
                            required
                            value={url2}
                            onChange={updatedUrl2} />
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder="Url 3 "
                            required
                            value={url3}
                            onChange={updatedUrl3} />
                    </div>
                </div>
                <button type="submit">Create new Spot</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
};

export default CreateSpotForm;
