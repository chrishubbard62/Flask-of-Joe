
const ADD_IMAGE = 'coffee/addImage'

const addPost = (payload) => {
    return {
        type: ADD_IMAGE,
        payload
    }
}

export const createImage = (post) => async (dispatch) => {
    const response = await fetch(`/api/images`, {
        method: "POST",
        //   headers: {
        //     'Accept': 'application/json',
        //     "Content-Type": "application/json",
        //   },
        body: post
    });

    if (response.ok) {
        const { resPost } = await response.json();
        dispatch(addPost(resPost));
    } else {
        const error = await response.json()
        console.log(error)
        console.log("There was an error making your post!")
    }
};

//===============Lalos coffee.js code ==========================

const GET_ALL_FAVS = 'coffee/get-user-favs'

const getAllFavs = favs => {
    return {
        type: GET_ALL_FAVS,
        payload: favs
    }
}

export const getUserFavoritesThunk = () => async dispatch => {
    const res = await fetch('/api/favorites');

    if (res.ok){
        const data = await res.json();
        dispatch(getAllFavs(data))
        return data;
    } else {
        const errors = await res.json()
        return errors
    }
}

//===============Lalos coffee.js code ==========================

const initialState = {}

export default function coffeeReducer(state = initialState, action){
    switch (action.type){
        case ADD_IMAGE:
            return {...state, ImageUrls: action.payload}
        //===================Lalos reducer code========================
        case GET_ALL_FAVS:
            return {...state, favorites: [...action.payload]}
        //===================Lalos reducer code========================
        default:
            return state
    }
}
