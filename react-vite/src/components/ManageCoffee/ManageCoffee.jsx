import { useEffect, useState } from 'react';
import './ManageCoffee.css';
import { useDispatch, useSelector } from 'react-redux';
import * as coffeeActions from '../../redux/coffee';

const ManageCoffee = () => {
    const dispatch = useDispatch();
    const coffees = useSelector(state => state.coffee.usersCoffees);
    const user = useSelector(state => state.session.user);
    // const [usersCoffees, setUsersCoffees] = useState([]);

    useEffect(() => {
        const innerFunct = async () => {
            await dispatch(coffeeActions.getUserCoffeesThunk())
        }
        innerFunct()
    }, [dispatch])

    // useEffect(() => {
    //     // console.log('\n\n this is coffees',coffees)
    //     let arr = [];
    //     if (coffees) {
    //         for (let el in coffees) {
    //             arr.push(coffees[el])
    //         }
    //     }
    //     setUsersCoffees(arr)
    //     // console.log(usersCoffees)
    // }, [coffees, user])

    if (!user) return
    if (!coffees) return


    return (
        <>
            <h1>manage coffee</h1>
            {coffees.map((coffee) => {
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
