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

    default:
      return state
  }
}