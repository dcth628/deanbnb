import React, {useEffect} from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spot";
import SpotDetails from "../SpotDetails";
import './SpotsAll.css'

const AllSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot)
    console.log(spots, 'this is spots object in all spots list')
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    return (
        <div className="spot-list">
            <NavLink exact to="/spots">Home</NavLink>
            <div>
            <h1 className="spot-list-title">Spot List</h1>
            </div>
            <ul className="spot-box" >
                {Object.values(spots).map(({id, name, description, price, previewImage, city, state, avgRating}) => (
                        <NavLink to={`/spots/${id}`}>
                    <div className="spot-tile" key={id}>
                        <div >
                        <img className='spot-images' src={previewImage} alt={previewImage}/>
                        </div>
                        <div class="first-line">
                        <div>
                        <p className="spot-city">{city}, {state}</p>
                        </div>

                        <div>
                        <i className={avgRating ? "fa fa-star star-allspots" : "no-rating"}>{ }{ }{avgRating ? avgRating : "NEW!"}</i>
                        </div>
                        </div>
                        <div>
                        <p className="spot-price">Price: ${price} night</p>
                        </div>
                    </div>
                        </NavLink>
                ))}
            </ul>
        </div>
    )
};

export default AllSpots;
