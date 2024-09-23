// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";


function ReviewList({ reviews }) {
  // const sessionUser = useSelector(state => state.session.user)
  // console.log(sessionUser)

  if (!reviews) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <div className="review-list">
      <div className="review-sum">
        <p>{reviews.length} Reviews</p>
        <p>🌟🌟🌟🌟🌟Star Postion</p>
      </div>

      <div className="review-details">
        <ul>
          {
            reviews.map(review => {
              return (<li key={review.id}>
                <p>🌟🌟🌟🌟🌟{review.stars}</p>
                <p>{review.review}</p>
                <p>{review.User.username}</p>
              </li>)
            })
          }
        </ul>
      </div>

      <div className="manage-review">
          <button>Make review(TBD)</button>
      </div>
    </div>
  )
}

export default ReviewList;