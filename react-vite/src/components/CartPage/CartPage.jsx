import { useDispatch, useSelector } from "react-redux"
import { getCartItemsThunk, getCartThunk, submitCartThunk } from "../../redux/cart"
import { useEffect, useState } from "react"
import { getCoffeesThunk } from "../../redux/coffee"
import CartItem from "./CartItem"
import "./CartPage.css";
import { useNavigate } from "react-router-dom"

export default function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const data = useSelector(state => state.cart)
  const cartItems = useSelector(state => state.cart.cartItems)
  const coffees = useSelector(state => state.coffee)
  const coffeeArr = Object.values(coffees)
  const [subtotal, setSubtotal] = useState(0);
  const coffeeIds = cartItems?.map(item => item.coffeeId)

  const cartCoffees = coffeeArr?.filter(coffee => coffeeIds?.includes(coffee?.id))

  const calculateTotal = (data) => {
    let price = 0;
    data?.cartItems?.forEach(item => {
      const itemId = item.coffeeId;
      console.log(data[itemId]);
      if (data[itemId] !== undefined) {
        const itemQuantity = data[itemId];
        const itemDetail = coffeeArr?.filter(coffee => coffee?.id === itemId);
        const itemPrice = itemDetail[0]?.price;
        price += itemQuantity * itemPrice;
      }
    });
    setSubtotal(price.toFixed(2));
  }

  useEffect(() => {
    dispatch(getCartThunk())
    dispatch(getCoffeesThunk())
    if(data.id){
      dispatch(getCartItemsThunk(data.id))
    }
    calculateTotal(data)
  }, [dispatch, data.id, data.cartItems?.length])

  if (!data || !cartItems || !coffees) return <h1>loading...</h1>


  const handleCheckout = () => {
    dispatch(submitCartThunk())
    navigate('/purchase')
  }

  return (
    <div className="cart-page-whole">
      <h1>{cartCoffees.length} Item(s) in your cart</h1>

    {cartCoffees?.length > 0 ?
    <div className="cart-page-item-subtotal">
      <div className="cart-page-cart-items">
        {cartCoffees.map((coffee) => {
          return (<CartItem key={coffee.id} coffee={coffee} data={data} cartItems={cartItems} calculateTotal={calculateTotal} />)
        })}
      </div>

      <div className="cart-page-cart-total">
        <h2>CART TOTALS</h2>
          <div className="cart-page-cart-subtotal">
            <h3>Subtotal</h3>
            <p>${subtotal}</p>
        </div>
        <button onClick={handleCheckout}>checkout</button>
      </div>
    </div>
    : <div></div>}

    </div>
  )
}
