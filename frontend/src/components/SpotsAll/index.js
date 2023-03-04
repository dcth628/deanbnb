import React, {useEffect} from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spot";
import SpotDetails from "../SpotDetails";
import './SpotsAll.css'

const AllSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot)
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    return (
        <div className="spot-list">
            <NavLink exact to="/">Home</NavLink>
            <h1>Spot List</h1>
            <li>
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
            </li>
            <Switch>
                <Route path='/api/spots/:spotId'>
                    <SpotDetails spots={spots}/>
                </Route>
            </Switch>
        </div>
    )
};

export default AllSpots;