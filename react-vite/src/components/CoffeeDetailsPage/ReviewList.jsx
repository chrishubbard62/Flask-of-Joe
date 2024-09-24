// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ReviewList.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton.jsx";
import PostReviewModal from "../PostReviewModal/PostReviewModal.jsx";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal.jsx";

function ReviewList({ reviews, coffee, coffee: { owner: { id } } }) {
  const sessionUser = useSelector(state => state.session.user);
  // const dispatch = useDispatch();
  // console.log(sessionUser)

  if (!reviews) {
    return (
      <h2>Loading...</h2>
    )
  }

  const calculateAvgRating = (reviews) => {
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
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

  // console.log(isDisabledReview)
  return (
    <div className="review-list-whole">
      <div className="review-list-summary">
        <p>{reviews.length} Reviews</p>
        <p>🌟🌟🌟🌟🌟 {calculateAvgRating(reviews) }</p>
      </div>

      <div className="review-details">
        <ul>
          {
            reviews.map(review => {
              return (<li key={review.id}>
                <p>🌟🌟🌟🌟🌟{review.stars}</p>
                <p>{review.review}</p>
                <p>{review.createdAt}</p>
                <p>{review.User.username}</p>
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