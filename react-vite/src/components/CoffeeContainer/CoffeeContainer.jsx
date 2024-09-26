import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCoffeesThunk } from '../../redux/coffee'
import CoffeeCard from './CoffeeCard'
import banner from '/banner.jpg'
import './LandingPage.css'


function CoffeeContainer() {
  const data = useSelector(state => state.coffee)
  const dispatch = useDispatch()
  const coffees = Object.values(data)

  useEffect(() => {
    dispatch(getCoffeesThunk())
  }, [dispatch])

  if (!data || !coffees) return <h2>Loading</h2>

  return (
    <div>
      <div className='banner-container'>
        <img src={banner} alt="coffee banner" className='banner-image' />
      </div>
      <div className='landing-outer-container'>
        <div className='landing-coffee-container'>
          {coffees?.map((coffee) => {
            return <CoffeeCard key={coffee?.id} coffee={coffee} />
          })}
        </div>
      </div>
    </div>
  )
}


export default CoffeeContainer
