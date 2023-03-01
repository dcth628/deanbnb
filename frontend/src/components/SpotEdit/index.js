import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSpot } from '../../store/spot';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
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
        e.preventDefault();

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
        let updatedSpot = await dispatch(editSpot(newSpot));
        if (updatedSpot) {
            closeModal();
            history.push(`/api/spots/${updatedSpot.id}`);
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        history.push('/api/spots')
    };

    return (
        <section className="edit-form-holdeer">
            <form className="edit-spot-form" onSubmit={handleSubmit}>
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
            <button type="submit">Update Spot</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
};

export default EditSpotForm;
