import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentSpot } from "../../store/spot";

const CurrentSpot = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state?.spot)

    useEffect(() => {
        dispatch(getCurrentSpot())
    }, [dispatch]);

    return (
        <div className="current-spot-list">
            <h1>Manage Your Spots</h1>
            <li>
                {spots && (
                    <div>
                {Object.values(spots).map(({id, name, description, price, previewImage, city, state, avgRating}) => (
                        <NavLink to={`/api/spots/${id}`}>
                    <div className="spot-tile" key={id}>

                        <img className='spot-images' src={previewImage} alt={previewImage}/>
                        <p>{name}</p>
                        <p>{description}</p>
                        <p>{avgRating ? avgRating : "NEW!"}</p>
                        <p>Price: ${price} night</p>
                        <p>{city}, {state}</p>
                    </div>
                        </NavLink>
                ))}
                </div>
                )}
            </li>
        </div>
    )
};

export default CurrentSpot;
