import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as coffeeActions from '../../redux/coffee';
import './FavoritesPage.css'

const FavoritesPage = () => {
    const dispatch = useDispatch();
    // const coffee = useSelector(state => state.coffee);
    const favs = useSelector(state => state.coffee.favorites)


    useEffect(() => {
        dispatch(coffeeActions.getUserFavoritesThunk())
    }, [dispatch])

    // this user favs array might go into the card component

    return (
        <div>
            <div className='your-favs-second-nav'>
                <div className='left-nav-area'>
                    <img style={{ height: '100px', width: '100px' }} />
                    <h3>Your Favorites</h3>
                </div>
                <button>+ Create new</button>
            </div>
            <div className='search-bar-area'>
                <input className='search-input' type='search' placeholder='Search your favorites' />
                <div>search icon here</div>
            </div>

            <div className='div-card-container'>
                {favs && favs.map(fav => {
                    console.log('this is favs in front end', favs)
                    return (
                        <div key={fav.id} className='coffee-card-favs'>
                            <img style={{ width: '100%', borderRadius: '10px' }} src={fav.coffee.coffeeImages[0].url} alt='image of coffee product' />
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
