import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


function CoffeeContainer() {
  const data = useSelector(state => state.coffees)
  const dispatch = useDispatch()
  const coffees = Object.values(data)

  return 
}


export default CoffeeContainer
