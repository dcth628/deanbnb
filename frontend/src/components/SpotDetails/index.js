import React, {useEffect} from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetail } from "../../store/spot";

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId } = useParams();
    const spots = useSelector(state => state.spot[spotId]);
    useEffect(() => {
        dispatch(getSpotDetail(spotId))
    }, [dispatch, spotId])

    return (
        <div>
            <h1>Spot Details</h1>
            <ul>
                <h2>{spots.name}</h2>
                <p>{spots.city}, {spots.state}, {spots.country}</p>
                <img src={spots.previewImage} alt={spots.previewImage} />
                <p>{spots.description}</p>
                <p>${spots.price} night</p>
                <p>{spots.avgRating}</p>
                <p>{spots.numReviews} Reviews</p>
            </ul>
        </div>
    )
};

export default SpotDetails;
