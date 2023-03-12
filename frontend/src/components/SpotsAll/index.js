import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spot";
import './SpotsAll.css'

const AllSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot)
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    return (
        <div className="spot-list">
            <div>
                <h1 className="spot-list-title">Spot List</h1>
            </div>
            <ul className="spot-box" >
                {Object.values(spots).map(({ id, name, description, price, previewImage, city, state, avgRating }) => (
                    <NavLink to={`/spots/${id}`}>
                        <div className="spot-tile" key={id}>
                            <div >
                                <img className='spot-images' src={previewImage} alt={previewImage} />
                            </div>
                            <div className="first-line">
                                <div>
                                    <div className="spot-city">{city}, {state}</div>
                                </div>

                                <div>
                                    <i className={avgRating ? "fa fa-star star-allspots" : "no-rating"}> </i>
                                    {avgRating ? avgRating : "NEW!"}
                                </div>
                            </div>
                            <div>
                                <div className="spot-price">${price} night</div>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </ul>
        </div>
    )
};

export default AllSpots;
