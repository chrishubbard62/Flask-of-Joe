const GET_ALL_FAVS = 'coffee/get-user-favs'

const getAllFavs = favs => {
    return {
        type: GET_ALL_FAVS,
        payload: favs
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

const initialState = {};

export default function favoritesReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_FAVS:
            return {...state, favorites: [...action.payload]}
        default:
            return state
    }
}
