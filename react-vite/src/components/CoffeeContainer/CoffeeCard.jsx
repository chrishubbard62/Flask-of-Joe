import {Link} from 'react-router-dom'
import { FaRegStar } from "react-icons/fa";


function CoffeeCard({coffee}) {

  return (
    <Link to={`/${coffee.id}`}>
      <h2>{coffee.name}</h2>
      <p>${coffee.price}</p>
      {<p>{coffee.reviews.length < 1 ? 'New' : (coffee.reviews.reduce((sum, coffee) => sum + coffee.stars, 0) / coffee.reviews.length).toFixed(1)}<FaRegStar /> </p>}
      {coffee.coffeeImages.length > 0 && <img style={{width: '30rem'}}src={coffee.coffeeImages[0].url} alt="coffee-image" />}
    </Link>
  )
}

export default CoffeeCard
