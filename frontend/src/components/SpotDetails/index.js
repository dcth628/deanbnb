import React, { useEffect, useRef, useState } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { getSpotDetail } from "../../store/spot";
import EditSpotForm from "../SpotEdit";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AllReviews from "../ReviewBySpotId";
import CreateReviewFrom from "../ReviewCreate";
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector(state => state?.spot[spotId]);
  const sessionUser = useSelector(state => state?.session.user);
  const reviews = useSelector(state => state.review);
  let sessionUserReview;
  if (sessionUser) sessionUserReview = Object.values(reviews).filter(review => review.userId === sessionUser.id)
  console.log(sessionUserReview , 'this is session user review')


  useEffect(() => {
    dispatch(getSpotDetail(spotId))
  }, [dispatch, spotId]);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  const windowAlert = () => {
    alert("Feature coming soon.....")
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
      {!sessionUser && spots ? (
        <div className="spot-detail">
          <h1 className="spot-detail-title">Spot Details</h1>
          <ul key={spots.id}>
            <h2>{spots.name}</h2>
            <p>{spots.city}, {spots.state}, {spots.country}</p>
            <img className="previewImage" src={spots.previewImage} alt={spots.previewImage} />
            {
              spots.SpotImages && spots.SpotImages.map((image) => {
                return <img className="spotImage" src={image.url} alt={image} key={image.id} />
              })
            }

            <div className="spot-info-box">
              <div>

                {spots.Owner && <p className="spot-host">Hosted by {spots.Owner.firstName} {spots.Owner.lastName}</p>}
                <p className="spot-description">{spots.description}</p>
              </div>

              <div className="spot-rightbox">
                <div className="spotdetail-right-side-box">

                  <div className="spot-price">${spots.price} night</div>
                  {spots.avgRating &&
                    spots.avgRating ?
                    <i className="fa fa-star spot-rating"> {spots.avgRating} </i> :
                    <div className="spot-rating">NEW!</div>
                  }
                  {spots.numReviews &&
                    spots.numReviews ?
                    <div className="spot-review"> {spots.numReviews} Reviews</div> :
                    <div className="spot-review"> Leave a review?</div>
                  }
                </div>
                <button className="spot-reserve" onClick={windowAlert}>Reserve</button>
              </div>
            </div>
            <div className="reivew-list">
              <AllReviews spots={spots} />
            </div>
            </ul>
        </div>
      )
        :
        (spots && (
          <div className="spot-detail">
            <h1 className="spot-detail-title">Spot Details</h1>
            <ul className="spot-detail-tile" key={spots.id}>
              <h2 className="spot-name">{spots.name}</h2>
              <p>{spots.city}, {spots.state}, {spots.country}</p>
              <img className="previewImage" src={spots.previewImage} alt={spots.previewImage} />
              {
                spots.SpotImages && spots.SpotImages.map((image) => {
                  return <img className="spotImage" src={image.url} alt={image.id} />
                })
              }
              <div className="spot-info-box">
                <div>

                  {spots.Owner && <p className="spot-host">Hosted by {spots.Owner.firstName} {spots.Owner.lastName}</p>}
                  <p className="spot-description">{spots.description}</p>
                </div>

                <div className="spot-rightbox">
                  <div className="spotdetail-right-side-box">

                    <div className="spot-price">${spots.price} night</div>
                    {spots.avgRating &&
                      spots.avgRating ?
                      <i className="fa fa-star spot-rating"> {spots.avgRating} </i> :
                      <div className="spot-rating">NEW!</div>
                    }
                    {spots.numReviews &&
                      spots.numReviews ?
                      <div className="spot-review"> {spots.numReviews} Reviews</div> :
                      <div className="spot-review"> Leave a review?</div>
                    }
                  </div>
                  <button className="spot-reserve" onClick={windowAlert}>Reserve</button>
                </div>
              </div>

              {sessionUser && sessionUser.id === spots.ownerId ?
                <button className="edit-spot-button">
                  <OpenModalMenuItem
                    itemText="Edit Spot"
                    onItemClick={closeMenu}
                    modalComponent={<EditSpotForm spot={spots} />}
                  />
                </button>
                :
                <></>
              }
              {sessionUserReview.length > 0 || sessionUser.id === spots.ownerId ?
                <></>
                :
                <button className="edit-spot-button">
                  <OpenModalMenuItem
                    itemText="Post Review"
                    onItemClick={closeMenu}
                    modalComponent={<CreateReviewFrom spotId={spotId} />}
                  />
                </button>
              }
            </ul>
            <div className="spotdetail-review">
              {spots.avgRating &&
                spots.avgRating ?
                <i className="fa fa-star spotdetail-rating-bottom"> {spots.avgRating} </i> :
                <div className="spotdetail-rating-bottom">NEW!</div>
              }
              {spots.numReviews &&
                spots.numReviews ?
                <div className="spotdetail-review-bottom"> {spots.numReviews} Reviews</div> :
                <div className="spotdetail-review-bottom"> Leave a review?</div>
              }
            </div>
            <div className="reivew-list">
              <AllReviews spots={spots} />
            </div>
          </div>
        ))}
    </div>
  )
};

export default SpotDetails;
