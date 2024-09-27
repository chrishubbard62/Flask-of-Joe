import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as usersCoffeeActions from '../../redux/usersCoffee';
import './DeleteCoffeeModal.css';
const SEED_ID = [1,2,3,4,5];


const DeleteCoffeeModal = ({coffee}) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const handleCLick = async (coffeeId) => {
        await dispatch(usersCoffeeActions.deleteCoffeeThunk(coffeeId));
        closeModal();
    }

    return (
        <div className='delete-coffee-modal-box'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this coffee?</p>
            <button disabled={SEED_ID.includes(coffee.id)}className='delete-coffee-button' onClick={()=>{handleCLick(coffee.id)}}>Yes (Delete Coffee)</button>
            <button className='delete-coffee-button' onClick={()=>{closeModal()}}>No (Keep Coffee)</button>
        </div>
    )
}
export default DeleteCoffeeModal;
