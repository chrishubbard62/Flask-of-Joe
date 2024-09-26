import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as coffeeActions from '../../redux/coffee';
import './DeleteCoffeeModal.css';

const DeleteCoffeeModal = () => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const handleCLick = async () => {
        await dispatch(coffeeActions.deleteCoffeeThunk());
        closeModal();
    }

    return (
        <div className='delete-coffee-modal-box'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this coffee?</p>
            <button className='delete-coffee-button' onClick={()=>{handleCLick()}}>Yes (Delete Coffee)</button>
            <button className='delete-coffee-button' onClick={()=>{closeModal()}}>No (Keep Coffee)</button>
        </div>
    )
}
export default DeleteCoffeeModal;
