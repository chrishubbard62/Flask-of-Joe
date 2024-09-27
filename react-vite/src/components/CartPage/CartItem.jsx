import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCartItemThunk, updateCartItemThunk } from "../../redux/cart";
import "./CartPage.css";

const CartItem = ({coffee, data, cartItems}) => {
    // console.log(data)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(data[coffee.id] || 1);

    let cartItem;
    if (cartItems){
        cartItem = cartItems.find(item=>coffee.id === item.coffeeId)
    }


    useEffect(()=>{
        setQuantity(data[coffee.id])
    }, [data, coffee.id])
    // console.log(cartItem)

    const confirm = () => {
        dispatch(updateCartItemThunk(data.id,{'coffee_id':coffee.id, 'quantity':quantity}))
    }
    const handleDelete = () => {
        dispatch(deleteCartItemThunk(cartItem.id))
    }

    return (
        <div className="cart-item-whole">
            <img style={{height: '100px'}}src={coffee.coffeeImages[0].url} />
            <div>{coffee.name}</div>
            <div>{coffee.price}</div>
            <div >current quantity: {data[coffee.id]}</div>
            <input type='number' value={quantity} onChange={(e)=>setQuantity(e.target.value)}></input>
            <button onClick={confirm}>confirm quantity</button>
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}
export default CartItem
