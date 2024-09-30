import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCartItemThunk } from "../../redux/cart";
import './DeleteCartItemModal.css';

const DeleteCartItemModal = ({ cartItemId }) => {
    console.log(cartItemId)
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteCartItemThunk(cartItemId))
        closeModal();
    }


    return (
        <>
            <div className='cart-item-delete-container'>
                <h2 className="delete-cart-h2">Confirm Delete</h2>
                <p className="delete-cart-p">Are you sure you want to delete this Item?</p>

                <div>
                    <button
                        className='cart-item-delete-modal-button'
                        onClick={handleDelete}
                    >
                        Yes (Delete Cart Item)
                    </button>

                    <button
                        className='cart-item-dont-delete-button'
                        onClick={() => closeModal()}
                    >
                        No (Keep Cart Item)
                    </button>
                </div>
            </div>
        </>
    )
}
export default DeleteCartItemModal;
