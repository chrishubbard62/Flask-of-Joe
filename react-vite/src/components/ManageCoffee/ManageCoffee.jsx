import { useEffect } from 'react';
import './ManageCoffee.css';
import { useDispatch, useSelector } from 'react-redux';
import * as coffeeActions from '../../redux/coffee';
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteCoffeeModal from '../DeleteCoffeeModal';
import { getUserCoffeesThunk } from '../../redux/usersCoffee';

const ManageCoffee = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const newUserCoffees = useSelector(state=>state.userCoffee)

    const usersCoffees = Object.values(newUserCoffees);

    useEffect(() => {
        dispatch(coffeeActions.getCoffeesThunk())
        dispatch(getUserCoffeesThunk())
    }, [dispatch, user])


    if (!user) return <h1>loading...</h1>
    if (!newUserCoffees) return <h1>loading...</h1>
    const handleNav = (coffeeId) => {
        navigate(`/coffees/${coffeeId}/edit`)
    }


    return (
        <>
            <h1 className='manage-coffee-banner'>Manage Coffee</h1>
            <div className='manage-coffee-card-container'>
                {usersCoffees.length > 0 ? usersCoffees.map((coffee) => {
                    return (
                        <div key={coffee.id} className='manage-coffee-card'>
                            <div className='manage-coffee-card-no-button' onClick={() => navigate(`/coffees/${coffee.id}`)}>
                                <img className='manage-coffees-image' src={coffee.coffeeImages[0].url} />
                                <div className='manage-coffee-card-details'>
                                    <div>{coffee.name}</div>
                                    <div>price: {coffee.price}</div>
                                    <div>region: {coffee.region}</div>
                                    <div>roast: {coffee.roast}</div>
                                </div>
                            </div>

                            <div className='manage-coffee-buttons'>
                                <OpenModalButton
                                    buttonText='Delete coffee'
                                    modalComponent={<DeleteCoffeeModal coffee={coffee} />} />
                                <button onClick={() => handleNav(coffee.id)}>Update</button>
                            </div>

                        </div>
                    )
                }) : <div className='manage-coffee-no-exsited-coffee'>
                    <h2 >Put your product up for sale!</h2>
                    <button className='manage-coffee-button' onClick={() => navigate('/coffees/new')}>Add a product</button>
                </div>}
            </div>
        </>
    )
}
export default ManageCoffee;
