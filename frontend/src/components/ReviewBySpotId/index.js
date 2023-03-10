import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../store/review";
import EditReviewForm from "../ReviewEdit";
import { useRef } from "react";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
// import * as reviewActions from '../../store/review';
import DeleteReview from "../ConfirmDeleteReviewModal";
import './ReviewBySpotId.css';


const AllReviews = ({ spots }) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { spotId } = useParams();
  let reviews = useSelector(state => Object.values(state.review));
  reviews = reviews.filter(review => review.spotId === spots.id)
  const sessionUser = useSelector(state => state?.session.user);
  // console.log(sessionUser , 'this is the session user')
  console.log(reviews, 'this is the reviews object')

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

  useEffect(() => {
    dispatch(getAllReviews(spotId))
  }, [dispatch, spotId]);


  return (
    <div>
      {reviews && (reviews.length > 0 ?
        <div>
          {reviews.map(review =>

            <div className="review-list" key={review.id}>
              <div className="review-firstName">{review.User.firstName}</div>
              <div className="review-date">{new Date(review.createdAt).toDateString().split(" ")[1]} {new Date(review.createdAt).toDateString().split(" ")[3]}</div>
              <div className="review-description">{review.review}</div>
              <i className="fa fa-star review-star"></i>{review.stars}
              {sessionUser && sessionUser.id === review.userId ?
                <div>
                  <button>
                    <OpenModalMenuItem
                      itemText="Edit Review"
                      onItemClick={closeMenu}
                      modalComponent={<EditReviewForm reviews={reviews} />}
                    />
                  </button>
                  <button>
                    <OpenModalMenuItem
                      itemText="Delete Review"
                      onItemClick={closeMenu}
                      modalComponent={<DeleteReview reviewId={review.id} spotId={spotId} />}
                    />
                  </button>
                </div>
                :
                <></>
              }
            </div>
          )}
        </div>
        :
        <>
        <div className="no-review-star-line">

        <i className="fa fa-star no-review-star"> </i> <div className="no-review-new">NEW!</div>
        </div>
        <div className="no-review">Be the first to leave a review!</div>
        </>
      )}
    </div>
  )
};

export default AllReviews;
