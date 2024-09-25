import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCoffeesThunk } from '../../redux/coffee'
import CoffeeCard from './CoffeeCard'



function CoffeeContainer() {
  const data = useSelector(state => state.coffee)
  const dispatch = useDispatch()
  const coffees = Object.values(data)

  useEffect(() => {
    dispatch(getCoffeesThunk())
  }, [dispatch])

  if(!data || !coffees) return <h2>Loading</h2>

  return (
    <div>
      <div>
        <h1>Banner Placeholder</h1>
      </div>
      <div>
        {coffees?.map((coffee) => {
          return <CoffeeCard key={coffee?.id} coffee={coffee}/>
        })}
      </div>
    </div>
  )
}


export default CoffeeContainer
