import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCoffeesThunk } from '../../redux/coffee'
import CoffeeCard from './CoffeeCard'
import './LandingPage.css'


function CoffeeContainer() {
  const data = useSelector(state => state.coffee)
  const dispatch = useDispatch()
  const coffees = Object.values(data)
  const [filtered, setFiltered] = useState(coffees)

  useEffect(() => {
    dispatch(getCoffeesThunk())
  }, [dispatch])

  useEffect(() => {
    setFiltered(Object.values(data))
  }, [data])

  const handleCategory = (type) => {
    if (type === 'all') {
      setFiltered(coffees)
    } else {
      setFiltered(coffees.filter(coffee => coffee.roast === type))
    }
  }

  if (!data || !coffees) return <h2>Loading</h2>

  return (
    <div>
      <div className='banner-container'>
        <div className='banner-image'></div>
      </div>
      <div className='landing-filters-outer'>
      <div className='coffee-landing-filters'>
          <div onClick={() => handleCategory('all')} className='filter-button'>
            <img className='filter-button-img all' src="/coffeesquare.jpg" alt="beans" />
            <div>
              All
            </div>
          </div>
          <div onClick={() => handleCategory('Light')} className='filter-button'>
          <img className='filter-button-img light' src="/coffeesquare.jpg" alt="beans" />
            <div>
              Light
            </div>
          </div>
          <div onClick={() => handleCategory('Medium')} className='filter-button'>
          <img className='filter-button-img medium' src="/coffeesquare.jpg" alt="beans" />
            <div>
              Medium
            </div>
          </div>
          <div onClick={() => handleCategory('Dark')} className='filter-button'>
          <img className='filter-button-img dark' src="/coffeesquare.jpg" alt="beans" />
            <div>
              Dark
            </div>
          </div>
          <div onClick={() => handleCategory('Espresso')} className='filter-button'>
          <img className='filter-button-img espresso' src="/coffeesquare.jpg" alt="beans" />
            <div>
              Espresso
            </div>
          </div>
        </div>
      </div>

      <div className='landing-outer-container'>
        <div className='landing-coffee-container'>
          {filtered?.map((coffee) => {
            return <CoffeeCard key={coffee?.id} coffee={coffee} />
          })}
        </div>
      </div>
    </div>
  )
}


export default CoffeeContainer
