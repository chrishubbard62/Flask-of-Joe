import "./CoffeeDetailsPage.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCoffeeThunk } from "../../redux/coffee";
import { getReviewsThunk } from "../../redux/review";
import ReviewList from "./ReviewList";
import { addCartItemThunk, getCartThunk } from "../../redux/cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
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
  const userCartId = userCart.id;
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);

  //!-------------------Luna-------------------
  const [isOpen, setIsOpen] = useState(false);
  //!-------------------Luna-------------------
  //---------------------lalo------------------
  let fav = useSelector(state=>state.favorite.favorites)
  //---------------------lalo------------------

  //Favourite Functionality
  const [isFav, setIsFav] = useState(false);


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
      if(fav.find((el)=>el.coffeeId === +coffeeId))setIsFav(true)
    }
  },[coffee,fav])

  let currReviews;
  useEffect(()=>{
    currReviews = reviews.filter((review)=>review.coffeeId === +coffeeId)
    // console.log('this is currReviews',currReviews)
  },[coffee,reviews])
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

  const addToCart = () => {
    dispatch(addCartItemThunk(userCartId, {quantity: 1, coffee_id: coffee.id}))
      .then(navigate('/cart'))
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
                    className={sessionUser === null ? "fav-disabled-button" : "coffee-detail-page-imgs-fav-button"}
                    onClick={() => handleFavButtonClick(coffeeId)}
                  >{isFav ? <FontAwesomeIcon icon={solidFaHeart} className="coffee-detail-red-heart"/>
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
          </div>

          <button onClick={addToCart}>Add to Cart</button>

          <div className="coffee-detail-page-owner-desc">
            <div className="coffee-detail-page-toggle-block" onClick={() => setIsOpen(!isOpen)}>
              <h2>More Info</h2>
              <span className="coffee-detail-toggle-icons">{isOpen ? <FontAwesomeIcon icon={faCaretUp} />
                      : <FontAwesomeIcon icon={faCaretDown} />}</span>
            </div>

            {isOpen && (
              <div>
                <h3>Owned By: {owner.username}</h3>
                <h3>About this coffee:</h3>
                <p>{description}</p>
              </div>
            )}

          </div>
        </div>

      </div>

      <ReviewList
      reviews={reviews.filter((review)=>review.coffeeId === +coffeeId)}
      coffee={coffee}
      />
    </div>
  )
}


export default CoffeeDetailsPage;
