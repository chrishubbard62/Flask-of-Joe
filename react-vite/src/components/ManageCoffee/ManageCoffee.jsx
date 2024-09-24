import { useEffect, useState } from 'react';
import './ManageCoffee.css';
import { useDispatch, useSelector } from 'react-redux';
import * as coffeeActions from '../../redux/coffee';

const ManageCoffee = () => {
    const dispatch = useDispatch();
    const coffees = useSelector(state => state.coffee);
    const user = useSelector(state => state.session.user)
    const [usersCoffees, setUsersCoffees] = useState([])

    useEffect(() => {
        dispatch(coffeeActions.getCoffeesThunk())
    }, [dispatch])

    useEffect(() => {
        let arr = [];
        if (coffees) {
            for (let el in coffees) {
                if (coffees[el].ownerId === user?.id) {
                    arr.push(coffees[el])
                }
            }
        }
        setUsersCoffees(arr)
    }, [coffees, user])

    if(!user)return
    if(!coffees)return

    return (
        <>
            <h1>manage coffee</h1>
            {usersCoffees.map((el) => {
                return (
                    <div key={el.id}>
                        <img style={{height:'100px'}}src={el.coffeeImages[0].url} />
                        <div>{el.name}</div>
                        <div>{el.description}</div>
                        <div>price: {el.price}</div>
                        <div>region: {el.region}</div>
                        <div>roast: {el.roast}</div>
                    </div>
                )
            })}
        </>
    )
}
export default ManageCoffee;
