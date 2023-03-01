import React, { useEffect, useRef, useState } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetail } from "../../store/spot";
import EditSpotForm from "../SpotEdit";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector(state => state.spot[spotId]);
  useEffect(() => {
    dispatch(getSpotDetail(spotId))
  }, [dispatch, spotId])

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

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
        <button>
          <OpenModalMenuItem
            itemText="Edit Spot"
            onItemClick={closeMenu}
            modalComponent={<EditSpotForm spot={spots}/>}
          />
        </button>
      </ul>
    </div>
  )
};

export default SpotDetails;
