import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentSpot } from "../../store/spot";
import ConfirmDeleteSpotModal from "../ComfirmDeleteSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useModal } from "../../context/Modal";
import EditSpotForm from "../SpotEdit";

const CurrentSpot = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state?.spot);
    const sessionUser = useSelector(state => state?.session.user);
    console.log(spots, 'this is spots user id');
    console.log(sessionUser.id , 'this is session user id')
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getCurrentSpot())
    }, [dispatch]);


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
        <div className="current-spot-list">
            <ul>
                {Object.values(spots).length > 0 ? (
                    <div>
                        <h1>Manage Your Spots</h1>
                        {Object.values(spots).map(({ id, name, description, price, previewImage, city, state, avgRating, ownerId }) => (
                            <>
                                <NavLink to={`/spots/${id}`}>
                                    <div className="spot-tile" key={id}>

                                        <img className='spot-images' src={previewImage} alt={previewImage} />
                                        <p>{name}</p>
                                        <p>{description}</p>
                                        <p>{avgRating ? avgRating : "NEW!"}</p>
                                        <p>Price: ${price} night</p>
                                        <p>{city}, {state}</p>
                                    </div>
                                </NavLink>
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Delete Spot"
                                        onItemClick={closeMenu}
                                        modalComponent={<ConfirmDeleteSpotModal spotId={id} />}
                                    />
                                </button>
                            </>
                        )
                        )}
                    </div>
                ) :
                <h1> You have no spot!!</h1>
                }
            </ul>
        </div>
    )
};

export default CurrentSpot;
