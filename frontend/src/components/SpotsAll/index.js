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
            <ul >
                {Object.values(spots).map(({id, name, description, price, previewImage, city, state, avgRating}) => (
                    <div className="spot-tile" key={id}>
                        <NavLink to={`/api/spots/${id}`}>

                        <img className='spot-images' src={previewImage} alt={previewImage}/>
                        </NavLink>
                        <NavLink to={`/api/spots/${id}`}>{name} : {description}</NavLink>
                        <p>{avgRating}</p>
                        <p>{city}, {state}</p>
                        <p> Price: ${price} night</p>
                    </div>
                ))}
            </ul>
            <Switch>
                <Route path='/api/spots/:spotId'>
                    <SpotDetails spots={spots}/>
                </Route>
            </Switch>
        </div>
    )
};

export default AllSpots;
