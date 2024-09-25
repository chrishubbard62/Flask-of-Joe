import "./CoffeeDetailsPage.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoffeeThunk } from "../../redux/coffee";
import { getReviewsThunk } from "../../redux/review";
import ReviewList from "./ReviewList";
import { addCartItemThunk, getCartThunk } from "../../redux/cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
//-----------------------------this is lalos addendum-----------------------------
import * as favoritesActions from '../../redux/favorites';
//-----------------------------this is lalos addendum-----------------------------

function CoffeeDetailsPage() {
  const { id: coffeeId } = useParams();
  const dispatch = useDispatch();
  const coffee = useSelector((state) => state.coffee[coffeeId]);
  const reviewsObj = useSelector((state) => state.review);
  const reviews = Object.values(reviewsObj);
  const userCart = useSelector((state) => state.cart);
  const userCartId = userCart.currentCartId;
  //---------------------lalo------------------
  let fav = useSelector(state=>state.favorite.favorites)
  //---------------------lalo------------------

  //Favourite Functionality
  const [isFav, setIsFav] = useState(false);

  // console.log(userCartId)

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(getCoffeeThunk(coffeeId))
      .then(() => setIsLoaded(true))

    dispatch(getReviewsThunk(coffeeId));
    dispatch(getCartThunk());
    //------------lalo-----------------
    dispatch(favoritesActions.getUserFavoritesThunk())
    //------------lalo-----------------
  }, [dispatch, coffeeId])
  //----------lalo----------------
  useEffect(()=>{
    if(!isFav && fav){
      // let thisfav = fav.find((el)=>el.coffeeId === +coffeeId)
      // if(thisfav && thisfav.coffeeId === +coffeeId){
      //   setIsFav(true)
      // }
      if(fav.find((el)=>el.coffeeId === +coffeeId))setIsFav(true)
    }
  },[coffee,fav])
  //----------lalo----------------

  if (!isLoaded ) {
    return <h2>Loading...</h2>
  }

  const { coffeeImages, description, name, owner, price, region, roast } = coffee;
  // console.log(coffeeImages[0].id, coffeeImages[0].url, coffeeImages)

  const handleFavButtonClick = (id) => {
    //------------------------lalo-------------------------
    if (!isFav){
      dispatch(favoritesActions.addFavoriteThunk(id))
    } else {
      dispatch(favoritesActions.removeFavoriteThunk(id))
    }
    setIsFav(prevFav=> !prevFav)
    //------------------------lalo-------------------------
    // console.log(id);
    // setIsFav(prevFav => !prevFav);
  }

  return (
    <div className="coffee-detail-page-whole">

      <div className="coffee-detail-page-upper">

        <div className="coffee-detail-page-imgs">
          {
            coffeeImages?.map(({ id, url }) => {
              return (
                <div key={id} className="coffee-detail-page-img-wrapper">
                  <img
                    src={`${url}`}
                    alt='coffee image'
                    className="coffee-detail-page-preview-img"
                  />
                  <button
                    className="coffee-detail-page-imgs-fav-button"
                    onClick={() => handleFavButtonClick(coffeeId)}
                  >{isFav ? <FontAwesomeIcon icon={solidFaHeart} />
                      : <FontAwesomeIcon icon={regularFaHeart} />}
                  </button>
                </div>
              )
            })
          }
        </div>


        <div className="coffee-detail-page-right">
          <div className="coffee-detail-page-general-info">
            <h1 id="coffee-detail-page-product-name">{name}</h1>
            <h2>$ {price}</h2>
            <h3>Region: {region}</h3>
            <h3>Roast: {roast}</h3>

            <div className="coffee-detail-add-to-cart-button">
              <div className="coffee-detail-add-to-cart-button-wrapper">
                <div className="text">Add to Cart</div>
                <span className="icon">
                  <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                  </svg>
                </span>
              </div>
            </div>

          </div>

          <div className="coffee-detail-page-owner-desc">
            <h3>Owner: {owner.username}</h3>
            <h3>Description: {description}</h3>
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
