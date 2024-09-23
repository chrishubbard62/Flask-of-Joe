import {Link} from 'react-router-dom'


function CoffeeCard({coffee}) {

  return (
    <Link to={`/${coffee.id}`}>
      <h2>{coffee.name}</h2>
      <p>${coffee.price}</p>
      {coffee.coffeeImages.length > 0 && <img style={{width: '30rem'}}src={coffee.coffeeImages[0].url} alt="coffee-image" />}
    </Link>
  )
}

export default CoffeeCard
