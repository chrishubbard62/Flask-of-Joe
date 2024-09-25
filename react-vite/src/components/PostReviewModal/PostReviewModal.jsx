import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useEffect, useState } from 'react';
import { addReviewThunk } from '../../redux/review';
import './PostReviewModal.css';

export default function PostReviewModal({ coffeeId }) {
  // console.log(coffeeId)
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const [newReview, setNewReview] = useState("");
  const [hoveredStars, setHoveredStars] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const review = {
      review: newReview,
      stars
    }
    // console.log(review)
    dispatch(addReviewThunk(coffeeId, review))
      .then(closeModal)
  }

  useEffect(() => {
    let err = {};
    if (newReview.length > 200) {
      err.newReview = 'Review needs to be less than 200 characters';
    } else if (!newReview.length) {
      err.newReview = 'Please give a review';
    }

    if (!stars) {
      err.stars = 'Please rate'
    }

    setErrors(err);
  }, [newReview, stars])

  return (
    <div className='post-review-frame'>
      <div className='post-review-header'>
        <h2>How do you feel about this coffee?</h2>
      </div>

      <form className='post-review-form'>
        <textarea
          type="text"
          value={newReview}
          placeholder="Leave your review here..."
          onChange={(e) => setNewReview(e.target.value)}
          required
        />
        <div className="post-review-star-rating">
          <div className="post-review-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onMouseEnter={() => setHoveredStars(n)}
                onMouseLeave={() => setHoveredStars(stars)}
                onClick={() => setStars(n)}
              >
                {hoveredStars >= n ? '★' : '☆'}
              </span>
            ))}
          </div>

          <span className="post-review-star-label">Stars</span>

        </div>

        <button
          className='post-review-inside-button'
          type='submit'
          disabled={Object.values(errors).length}
          onClick={handleSubmit}
        >
          Submit Your Review
        </button>

      </form>
    </div>
  )
}