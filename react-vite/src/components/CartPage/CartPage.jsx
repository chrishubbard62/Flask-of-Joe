import { useDispatch, useSelector } from "react-redux"
import { getCartThunk } from "../../redux/cart"
import { useEffect } from "react"

export default function CartPage() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.cart)
  
  useEffect(() => {
    dispatch(getCartThunk())
  }, [dispatch])


  return <h1>Cart</h1>
}
