import { useEffect } from 'react';
import './ManageCoffee.css';
import { useDispatch, useSelector } from 'react-redux';
import * as userCoffeeActions from '../../redux/usersCoffee';
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteCoffeeModal from '../DeleteCoffeeModal';

const ManageCoffee = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { usersCoffees } = useSelector(state => state.userCoffee);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        const innerFunct = async () => {
            await dispatch(userCoffeeActions.getUserCoffeesThunk())
        }
        innerFunct()
    }, [dispatch, user])

    if (!user) return
    if (!usersCoffees) return

    return (
        <>
            <h1>manage coffee</h1>
            <div className='manage-coffee-card-container'>
                {usersCoffees.length > 0 ? usersCoffees.map((coffee) => {
                    return (
                        <div key={coffee.id} className='manage-coffee-card'>
                            <div className='manage-coffee-card-no-button' onClick={() => navigate(`/coffees/${coffee.id}`)}>
                                <img className='manage-coffees-image' src={coffee.coffeeImages[0].url} />
                                <div className='manage-coffee-card-details'>
                                    <div>{coffee.name}</div>
                                    <div>{coffee.description}</div>
                                    <div>price: {coffee.price}</div>
                                    <div>region: {coffee.region}</div>
                                    <div>roast: {coffee.roast}</div>
                                </div>
                            </div>
                            <OpenModalButton
                                buttonText='delete coffee'
                                modalComponent={<DeleteCoffeeModal coffee='coffee for now' />} />
                        </div>
                    )
                }) : <>
                    <h2>Put your product up for sale!</h2>
                    <button>Add a product</button>
                </>}
            </div>
        </>
    )
}
export default ManageCoffee;
