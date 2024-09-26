import { useDispatch, useSelector } from "react-redux"
import { getCartThunk } from "../../redux/cart"
import { useEffect } from "react"
import { getCoffeesThunk } from "../../redux/coffee"

export default function CartPage() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.cart)
  const coffees = useSelector(state => state.coffee)
  const coffeeIds = Object.keys(data)
  const coffeeArr = Object.values(coffees)
  // console.log(coffeeIds)

  const cartCoffees = coffeeArr.filter(coffee => coffeeIds.includes(coffee.id.toString()))
  console.log(cartCoffees)

  useEffect(() => {
    dispatch(getCartThunk())
    dispatch(getCoffeesThunk())
  }, [dispatch])


  return (
    <div>
      {

      }
    </div>
  )
}
