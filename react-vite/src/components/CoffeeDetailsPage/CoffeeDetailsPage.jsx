import "./CoffeeDetailsPage.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoffeeThunk } from "../../redux/coffee";
import { getReviewsThunk } from "../../redux/review";
import ReviewList from "./ReviewList";

function CoffeeDetailsPage() {
  const { id: coffeeId } = useParams();
  const dispatch = useDispatch();
  const coffee = useSelector((state) => state.coffee[coffeeId]);
  const reviewsObj = useSelector((state) => state.review);
  const reviews = Object.values(reviewsObj)

  // console.log(reviews)

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(getCoffeeThunk(coffeeId))
      .then(() => setIsLoaded(true))
    
    dispatch(getReviewsThunk(coffeeId))
  }, [dispatch, coffeeId])

  if (!isLoaded) {
    return <h2>Loading...</h2>
  }

  const { coffeeImages, description, name, owner, price, region, roast } = coffee;
  // console.log(coffeeImages[0].id, coffeeImages[0].url, coffeeImages)


  return (
    <div>
      <div>
        {
          coffeeImages?.map(({id, url}) => {
            return (<img
              key={id}
              src={`${url}`}
              alt='coffee image'
              style={{"width": "30rem"}}
            />)
          })
        }
      </div>

      <div>
        <p>Name: {name}</p>
        <p>$ {price}</p>
        <p>Region: {region}</p>
        <p>Roast: {roast}</p>
        <button>Add to Cart</button>
      </div>

      <div>
        <p>Owner: {owner.username}</p>
        <p>Description: {description}</p>
      </div>

      <ReviewList 
      reviews={reviews} 
      coffee={coffee}
      />
    </div>
  )
}


export default CoffeeDetailsPage;