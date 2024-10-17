import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItemThunk } from "../../redux/cart";
import "./CartPage.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteCartItemModal from "../DeleteCartItemModal/DeleteCartItemModal";
const QUANTITY_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const CartItem = ({ coffee, data, cartItems, calculateTotal }) => {
    // console.log(data)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(data[coffee.id] || 1);

    let cartItem;
    if (cartItems) {
        cartItem = cartItems.find(item => coffee.id === item.coffeeId)
    }


    useEffect(() => {
        setQuantity(data[coffee.id])
        calculateTotal(data)
    }, [data, coffee.id, calculateTotal])
    // console.log(cartItem)

    const confirm = () => {
        dispatch(updateCartItemThunk(data.id, { 'coffee_id': coffee.id, 'quantity': quantity }))
    }

    return (
        <div className="cart-item-whole">
            <div style={{ backgroundImage: `url(${coffee.coffeeImages[0].url})` }} className='image-in-cart' ></div>
            {/* <img src={coffee.coffeeImages[0].url} /> */}



            <div className="cart-item-right-info">
                <div className="cart-item-name-price">
                    <h2>{coffee.name}</h2>

                </div>

                <div className="cart-item-quantity">
                    <p>current quantity: {data[coffee.id]}</p>
                    {/* <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)}></input> */}
                    <select
                        name='select-quantity'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    >
                        {QUANTITY_ARR.map((num) => {
                            return (<option key={num} value={num}>{num}</option>)
                        })}
                    </select>
                    <button onClick={confirm}>Confirm quantity</button>
                    <OpenModalButton
                        buttonText='Delete'
                        className='delete-button-for-event'
                        modalComponent={<DeleteCartItemModal cartItemId={cartItem?.id} />} />
                </div>
            </div>

            <div className="cart-item-price">
                <h2>${coffee.price.toFixed(2)}</h2>
            </div>

        </div>
    )
}
export default CartItem
