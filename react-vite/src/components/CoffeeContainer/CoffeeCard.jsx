import { Link } from 'react-router-dom'
import { FaRegStar } from "react-icons/fa";


function CoffeeCard({ coffee }) {
  if (!coffee) return <h2>Loading</h2>

  return (
    <Link className='coffee-card-link' to={`/coffees/${coffee.id}`}>
      {coffee.coffeeImages.length > 0 && <img className='landing-page-coffee-image' src={coffee.coffeeImages[0].url} alt="coffee-image" />}
      <div className='coffee-card-info'>
        <p>{coffee.name}</p>
        {<p>{coffee.reviews.length < 1 ? 'New' : (coffee.reviews.reduce((sum, coffee) => sum + coffee.stars, 0) / coffee.reviews.length).toFixed(1)}<FaRegStar /> </p>}
      </div>
      <p>${coffee.price.toFixed(2)}</p>
    </Link>
  )
}

export default CoffeeCard
