import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as usersCoffeeActions from '../../redux/usersCoffee';
import * as coffeeActions from '../../redux/coffee';
import './DeleteCoffeeModal.css';
const SEED_ID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];


const DeleteCoffeeModal = ({ coffee }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleCLick = async (coffeeId) => {
        await dispatch(usersCoffeeActions.deleteCoffeeThunk(coffeeId));
        await dispatch(coffeeActions.deleteCoffee(coffeeId));
        closeModal();
    }

    return (
        <div className='delete-coffee-modal-box'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this coffee?</p>
            <div className="delete-buttons-coffee">
                <button disabled={SEED_ID.includes(coffee.id)} className='delete-coffee-button' onClick={() => { handleCLick(coffee.id) }}>Yes (Delete Coffee)</button>
                <button className='delete-coffee-button' onClick={() => { closeModal() }}>No (Keep Coffee)</button>
            </div>
        </div>
    )
}
export default DeleteCoffeeModal;
