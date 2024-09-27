// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ReviewList.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton.jsx";
import PostReviewModal from "../PostReviewModal/PostReviewModal.jsx";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularFaStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

function ReviewList({ reviews, coffee, coffee: { owner: { id } } }) {
  const sessionUser = useSelector(state => state.session.user);
  // const dispatch = useDispatch();
  // console.log(sessionUser)

  // console.log(reviews)
  // if (!reviews?.length) {
  //   return (
  //     <h2>No Reviews Yet!</h2>
  //   )
  // }

  const calculateAvgRating = (reviews) => {
    const totalStars = reviews?.reduce((sum, review) => sum + review.stars, 0);
    const avgRating = (totalStars / reviews.length).toFixed(1);
    return avgRating;
  };

  const isDisabledDelete = (review) => {
    return sessionUser === null
          ||!Object.values(sessionUser).length
          || sessionUser.id !== review.User.id;
  };

  const isDisabledReview = sessionUser === null
                            || sessionUser && !Object.values(sessionUser).length
                            || id === sessionUser.id
                            || reviews.find(review => review.userId === sessionUser.id
                                            && review.coffeeId === coffee.id
                                          )

  const starIconDisplay = (stars) => {
    const starIcon = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= stars) {
        starIcon.push(<FontAwesomeIcon key={i} icon={solidFaStar} className="review-list-star-icons" />);
      } else if (i - stars < 1) {
        starIcon.push(<FontAwesomeIcon key={i} icon={faStarHalfStroke} className="review-list-star-icons" />);
      } else {
        starIcon.push(<FontAwesomeIcon key={i} icon={regularFaStar} className="review-list-star-icons" />);
      }
    }
    return starIcon;
  }

  return (
    <div className="review-list-whole">
      <div className="review-list-summary">
        <h2>Ratings and reviews</h2>
        <p id="review-list-avg-big">{reviews.length ? calculateAvgRating(reviews) : 'No Reviews'}</p>

        <div className="review-list-avg-stars">{starIconDisplay(calculateAvgRating(reviews))}</div>
      </div>



      <div className="review-details">
        {reviews ?
        (<h3>All Reviews ({reviews.length})</h3>) 
        :
          (<h2>No Reviews Yet!</h2>)
        }

        <ul>
          {
            reviews.map(review => {
              return (<li key={review.id}>
                <p className="review-list-each-stars">{starIconDisplay(review.stars)}   {(review.stars).toFixed(1)}</p>
                <p className="review-list-text">{review.review}</p>

                <div className="review-list-name-date">
                  <p id="review-list-username"> {review.User.username} </p>
                  <p>{review.createdAt}</p>
                </div>

                <div
                  className={isDisabledDelete(review) ? 'disabled' : 'delete-review-button'}
                >
                  <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<DeleteReviewModal review={review} />}
                  />
                  </div>
              </li>)
            })
          }
        </ul>
      </div>

      <div className="manage-review">
          <div
            className={isDisabledReview ? 'disabled' : 'make-review-button'}
          >
            <OpenModalButton
              buttonText="Post Your Review"
              modalComponent={<PostReviewModal coffeeId={coffee.id} />}
            />
          </div>
      </div>
    </div>
  )
}

export default ReviewList;
