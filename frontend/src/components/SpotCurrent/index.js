import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentSpot } from "../../store/spot";
import ConfirmDeleteSpotModal from "../ConfirmDeleteSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateSpotForm from "../SpotCreate";
import './SpotCurrent.css'


const CurrentSpot = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state?.spot);
    const sessionUser = useSelector(state => state?.session.user);
    const userSpots = Object.values(spots).filter(spot => spot.ownerId === sessionUser.id)

    useEffect(() => {
        dispatch(getCurrentSpot())
    }, [dispatch]);


    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    // const openMenu = () => {
    //     if (showMenu) return;
    //     setShowMenu(true);
    // };

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
            <div>
                {userSpots && userSpots.length > 0 ? (
                    <div>
                        <h1 className="spot-list-title">Manage Your Spots</h1>
                        <button className="createspot-button-spotlist">
                            <OpenModalMenuItem
                                itemText="Create New Spot"
                                onItemClick={closeMenu}
                                modalComponent={<CreateSpotForm />}
                            />
                        </button>
                        <ul className="spot-box">
                            {userSpots.map(({ id, name, description, price, previewImage, city, state, avgRating }) => (
                                <div>
                                    <NavLink to={`/spots/${id}`}>
                                        <div className="spot-tile" key={id}>
                                            <div>
                                                <img className='spot-images' src={previewImage} alt={previewImage} />
                                            </div>
                                            <div className="first-line">
                                                <div className="spot-city">{city}, {state}</div>
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
                                    <button className="delete-spot-button">
                                        <OpenModalMenuItem
                                            itemText="Delete Spot"
                                            onItemClick={closeMenu}
                                            modalComponent={<ConfirmDeleteSpotModal spotId={id} />}
                                        />
                                    </button>
                                </div>
                            )
                            )}
                        </ul>
                    </div>
                ) :
                    <>
                        <h1 className="spot-list-title"> You have no spot!!</h1>
                        <button className="createspot-button-spotlist">
                            <OpenModalMenuItem
                                itemText="Create New Spot"
                                onItemClick={closeMenu}
                                modalComponent={<CreateSpotForm />}
                            />
                        </button>
                    </>
                }
            </div>
        </div>
    )
};

export default CurrentSpot;
