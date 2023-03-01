import React, {useEffect} from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spot";
import SpotDetails from "../SpotDetails";

const AllSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot)
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    return (
        <div>
            <NavLink exact to="/">Home</NavLink>
            <h1>Spot List</h1>
            <ul>
                {Object.values(spots).map(({id, name, description, price, previewImage, city, state, avgRating}) => (
                    <div key={id}>
                        <img src={previewImage} alt={previewImage}/>
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
