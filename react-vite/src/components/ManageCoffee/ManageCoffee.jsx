import { useEffect } from 'react';
import './ManageCoffee.css';
import { useDispatch, useSelector } from 'react-redux';
import * as userCoffeeActions from '../../redux/usersCoffee';

const ManageCoffee = () => {
    const dispatch = useDispatch();
    const {usersCoffees} = useSelector(state => state.userCoffee);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        const innerFunct = async () => {
            await dispatch(userCoffeeActions.getUserCoffeesThunk())
        }
        innerFunct()
    }, [dispatch])

    if (!user) return
    if (!usersCoffees) return

    return (
        <>
            <h1>manage coffee</h1>
            {usersCoffees.map((coffee) => {
                return (
                    <div key={coffee.id} className='manage-coffee-card'>
                        <img style={{ height: '100px' }} src={coffee.coffeeImages[0].url} />
                        <div>{coffee.name}</div>
                        <div>{coffee.description}</div>
                        <div>price: {coffee.price}</div>
                        <div>region: {coffee.region}</div>
                        <div>roast: {coffee.roast}</div>
                        <button>Add to cart</button>
                    </div>
                )
            })}
        </>
    )
}
export default ManageCoffee;
