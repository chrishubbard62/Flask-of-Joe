import { deleteReviewThunk } from "../../redux/review";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./DeleteReviewModal.css";


export default function DeleteReviewModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // console.log(review)

  return (
    <>
      <div className='delete-review-modal'>
        <div className='delete-review-header'>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this review?</p>
        </div>

        <button
          className='delete-review-yes'
          onClick={() => dispatch(deleteReviewThunk(review.id))
            .then(closeModal)}
        >
          Yes (Delete Review)
        </button>

        <button
          className='delete-review-no'
          onClick={() => closeModal()}
        >
          No (Keep Review)
        </button>
      </div>
    </>
  )
}