import React, { useEffect, useState } from "react";
import { NavLink, Switch, Route, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../store/review";
import EditReviewForm from "../ReviewEdit";
import { useRef } from "react";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import * as reviewActions from '../../store/review';
import  DeleteReview  from "../ConfirmDeleteReviewModal";


const AllReviews = ({ spots }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    let reviews = useSelector(state => Object.values(state.review));
    const sessionUser = useSelector(state => state?.session.user);
    // console.log(sessionUser , 'this is the session user')
    // console.log(reviews, 'this is the reviews object')

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
            {reviews && (reviews ?
                <div>
                    {reviews.map(review =>
                        <div key={review.id}>
                            <p>{review.review}</p>
                            <p>{review.stars}</p>
                            { review && review.userId === sessionUser.id ?
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
            <h1>NEW!!</h1>
            )}
        </div>
    )
};

export default AllReviews;
