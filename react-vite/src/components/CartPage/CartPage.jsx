import { useDispatch, useSelector } from "react-redux"
import { getCartItemsThunk, getCartThunk, submitCartThunk } from "../../redux/cart"
import { useEffect } from "react"
import { getCoffeesThunk } from "../../redux/coffee"
import CartItem from "./CartItem"
import "./CartPage.css";


export default function CartPage() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.cart)
  const cartItems = useSelector(state => state.cart.cartItems)
  const coffees = useSelector(state => state.coffee)
  const coffeeIds = Object.keys(data)
  const coffeeArr = Object.values(coffees)

  useEffect(() => {
    dispatch(getCartThunk())
    dispatch(getCoffeesThunk())
    if(data.id){
      dispatch(getCartItemsThunk(data.id))
    }
  }, [dispatch, data.id])

  if (!data || !cartItems || !coffees) return <h1>loading...</h1>
  const cartCoffees = coffeeArr.filter(coffee => coffeeIds.includes(coffee.id.toString()))

  const handleCheckout = () => {
    dispatch(submitCartThunk())
  }
  return (
    <div className="cart-page-whole">
      {cartCoffees.map((coffee) => {
        // console.log(coffee)
        return (<CartItem key={coffee.id} coffee={coffee} data={data} cartItems={cartItems} />)
      })}
      <button onClick={handleCheckout}>checkout</button>
    </div>
  )
}
