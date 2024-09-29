import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCartItemThunk, updateCartItemThunk } from "../../redux/cart";
import "./CartPage.css";

const CartItem = ({coffee, data, cartItems, calculateTotal}) => {
    // console.log(data)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(data[coffee.id] || 1);

    let cartItem;
    if (cartItems){
        cartItem = cartItems.find(item=>coffee.id === item.coffeeId)
    }


    useEffect(()=>{
        setQuantity(data[coffee.id])
        calculateTotal(data)
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
            <img src={coffee.coffeeImages[0].url} />



            <div className="cart-item-right-info">
                <div className="cart-item-name-price">
                    <h2>{coffee.name}</h2>
                    
                </div>

                <div className="cart-item-quantity">
                    <p>current quantity: {data[coffee.id]}</p>
                    <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                    <button onClick={confirm}>confirm quantity</button>
                    <button onClick={handleDelete}>delete</button>
                </div>
            </div>

            <div className="cart-item-price">
                <h2>$ {coffee.price.toFixed(2)}</h2>
            </div>

        </div>
    )
}
export default CartItem
