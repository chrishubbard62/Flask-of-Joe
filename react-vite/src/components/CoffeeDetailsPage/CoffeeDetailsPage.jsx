import "./CoffeeDetailsPage.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoffeeThunk } from "../../redux/coffee";
import { getReviewsThunk } from "../../redux/review";
import ReviewList from "./ReviewList";
import { addCartItemThunk, getCartThunk } from "../../redux/cart";

function CoffeeDetailsPage() {
  const { id: coffeeId } = useParams();
  const dispatch = useDispatch();
  const coffee = useSelector((state) => state.coffee[coffeeId]);
  const reviewsObj = useSelector((state) => state.review);
  const reviews = Object.values(reviewsObj);
  const userCart = useSelector((state) => state.cart);
  const userCartId = userCart.currentCartId;

  // console.log(userCartId)

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(getCoffeeThunk(coffeeId))
      .then(() => setIsLoaded(true))
    
    dispatch(getReviewsThunk(coffeeId));
    dispatch(getCartThunk());
  }, [dispatch, coffeeId])

  if (!isLoaded) {
    return <h2>Loading...</h2>
  }

  const { coffeeImages, description, name, owner, price, region, roast } = coffee;
  // console.log(coffeeImages[0].id, coffeeImages[0].url, coffeeImages)


  return (
    <div className="coffee-detail-page-whole">

      <div className="coffee-detail-page-upper">

        <div className="coffee-detail-page-imgs">
          {
            coffeeImages?.map(({ id, url }) => {
              return (<img
                key={id}
                src={`${url}`}
                alt='coffee image'
                className="coffee-detail-page-preview-img"
              // style={{"width": "30rem"}}
              />)
            })
          }
        </div>

        <div className="coffee-detail-page-right">
          <div className="coffee-detail-page-general-info">
            <p id="coffee-detail-page-product-name">Name: {name}</p>
            <p>$ {price}</p>
            <p>Region: {region}</p>
            <p>Roast: {roast}</p>
            <button
              onClick={() => 
                dispatch(addCartItemThunk({coffee_id: coffee.id, quantity: 1, cart_id: userCartId}))}
            >Add to Cart</button>
          </div>

          <div className="coffee-detail-page-owner-desc">
            <p>Owner: {owner.username}</p>
            <p>Description: {description}</p>
          </div>
        </div>

      </div>
      
      <ReviewList 
      reviews={reviews} 
      coffee={coffee}
      />
    </div>
  )
}


export default CoffeeDetailsPage;