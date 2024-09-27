const GET_ALL_FAVS = 'favorites/get-user-favs';
const ADD_NEW_FAV = 'favorites/add-new-favorite';
const REMOVE_FAV = 'favorites/remove-favorite';

const getAllFavs = favs => {
    return {
        type: GET_ALL_FAVS,
        payload: favs
    }
}

const addNewFav = fav => {
    return {
        type: ADD_NEW_FAV,
        payload: fav
    }
}

const removeFavorite = fav => {
    return {
        type: REMOVE_FAV,
        payload: fav
    }
}

export const getUserFavoritesThunk = () => async dispatch => {
    const res = await fetch('/api/favorites');

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllFavs(data))
        return data;
    } else {
        const errors = await res.json()
        return errors
    }
}

export const addFavoriteThunk = (coffee_id) => async dispatch => {
    const res = await fetch(`/api/favorites/${coffee_id}`, {
        method: 'POST',
        body: {'coffee_id': coffee_id},
        headers: {'Content-Type': "application/json"}
    })

    if (res.ok){
        const data = await res.json();
        dispatch(addNewFav(data));
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const removeFavoriteThunk = (coffee_id) => async dispatch => {
    const res = await fetch(`/api/favorites/delete/${coffee_id}`,{
        method: 'DELETE'
    })
    if(res.ok){
        const data = await res.json();
        dispatch(removeFavorite(data));
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}

const initialState = {};

export default function favoritesReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_FAVS:
            return {...state, favorites: [...action.payload]}
        case ADD_NEW_FAV:{
            let newState = {...state}
            if (newState.favorites) {
                newState.favorites.push(action.payload)
            }
            return {newState}
        }
        case REMOVE_FAV:{
            const newState = {...state};

            if (newState.favorites) {
                newState.favorites.forEach(fav => {
                    let index = newState.favorites.indexOf(fav)
                    if (fav.id === action.payload.deletedFavId) {
                        newState.favorites.splice(index, 1)
                    }
                });
            }
            return {...newState}
        }
        default:
            return state
    }
}
