import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCoffeesThunk } from '../../redux/coffee'
import CoffeeCard from './CoffeeCard'
import banner from '/banner.jpg'
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
    if(type === 'all') {
      setFiltered(coffees)
    } else {
      setFiltered(coffees.filter(coffee => coffee.roast === type))
    }
  }

  if (!data || !coffees) return <h2>Loading</h2>

  return (
    <div>
      <div className='banner-container'>
        <img src={banner} alt="coffee banner" className='banner-image' />
      </div>
      <div className='landing-outer-container'>
      <div className='coffee-landing-filters'>
        <button  onClick={() => handleCategory('all')} className='filter-button'>All</button>
        <button  onClick={() => handleCategory('Light')} className='filter-button'>Light</button>
        <button  onClick={() => handleCategory('Medium')} className='filter-button'>Medium</button>
        <button  onClick={() => handleCategory('Dark')} className='filter-button'>Dark</button>
        <button  onClick={() => handleCategory('Espresso')} className='filter-button'>Espresso</button>
      </div>
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
