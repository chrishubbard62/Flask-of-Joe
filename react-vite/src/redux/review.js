//! Get reviews based on coffee id
const GET_REVIEWS = 'review/getReviews';

const getReviews = (payload) => {
  return {
    type: GET_REVIEWS,
    payload
  }
}

export const getReviewsThunk = (coffeeId) => async(dispatch) => {
  const res = await fetch(`/api/coffees/${coffeeId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getReviews(data));
    return data;
  } else {
    const err = await res.json();
    return err;
  }
}


//!delete a review
const DELETE_REVIEW = 'review/delete';

const deleteReview = (payload) => {
  return {
    type: DELETE_REVIEW,
    payload
  }
}

export const deleteReviewThunk = (reviewId) => async(dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    const deletedReview = await res.json();
    dispatch(deleteReview(reviewId));
    return deletedReview;
  } else {
    const err = await res.json();
    return err;
  }
}


//!Post a review
const ADD_REVIEW = 'review/add';

const addReview = (payload) => {
  return {
    type: ADD_REVIEW,
    payload
  }
}


export const addReviewThunk = (coffeeId, newReview) => async(dispatch) => {
  const res = await fetch(`/api/coffees/${coffeeId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(newReview),
    headers: { 'Content-Type': 'application/json' }
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addReview(data));
    return data;
  } else {
    const err = await res.json();
    return err;
  }
}


const initialState = {};

export default function reviewReducer(state=initialState, action) {
  switch(action.type) {

    case GET_REVIEWS: {
      const newState = {...state};
      const reviews = action.payload.Reviews;

      reviews.forEach(review => {
        if (state[review.id]) {
          newState[review.id] = {...state[review.id], ...review}
        } else {
          newState[review.id] = review
        }
      })
      return newState;
    }

    case DELETE_REVIEW: {
      const newState = {...state};
      delete newState[action.payload];
      return newState;
    }

    case ADD_REVIEW: {
      const newState = {...state};
      const review = action.payload;
      newState[review.id] = review;
      return newState;
    }

    default:
      return state
  }
}