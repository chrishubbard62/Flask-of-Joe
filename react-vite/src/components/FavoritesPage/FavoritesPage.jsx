import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as favoritesActions from '../../redux/favorites';
import './FavoritesPage.css';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const coffee = useSelector(state => state.coffee);
    const user = useSelector(state => state.session.user)
    const favs = useSelector(state => state.favorite.favorites)


    useEffect(() => {
        dispatch(favoritesActions.getUserFavoritesThunk())
    }, [dispatch, user])

    // this user favs array might go into the card component

    return (
        <div>
            <div className='your-favs-second-nav'>
                <div className='left-nav-area'>
                    <img style={{ height: '100px', width: '100px' }} />
                    <h3>Your Favorites</h3>
                </div>
            </div>
            <div className='search-bar-area'>
                <input className='search-input' type='search' placeholder='Search your favorites' />
                <FaSearch className='favorites-search-icon' />
            </div>

            <div className='div-card-container'>
                {favs && favs.map(fav => {
                    return (
                        <div key={fav.id} className='coffee-card-favs' onClick={()=>navigate(`/coffees/${fav.coffeeId}`)}>
                            <img className='favorite-coffees-image' src={fav.coffee.coffeeImages[0].url} alt='image of coffee product' />
                            <div>
                                <div>{fav.coffee.name}</div>
                                <div>{fav.coffee.price}</div>
                                <button>Add to cart</button>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default FavoritesPage;
