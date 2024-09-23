
const ADD_IMAGE = 'coffee/addImage'
//? Chris /////////////////////////////////////////////////////////////////////////////////////
const GET_ALL_COFFEES = 'coffees/getAllCoffees'
//? Chris /////////////////////////////////////////////////////////////////////////////////////

const addPost = (payload) => {
    return {
        type: ADD_IMAGE,
        payload
    }
}

//? Chris /////////////////////////////////////////////////////////////////////////////////////
const getCoffees = (payload) => {
    return {
        type: GET_ALL_COFFEES,
        payload
    }
}
export const getCoffeesThunk = () => async (dispatch) => {
    const res = await fetch('/api/coffees');
    if (res.ok) {
        const data = await res.json();
        dispatch(getCoffees(data.Coffees));
        return data;
    }
}
//? Chris /////////////////////////////////////////////////////////////////////////////////////


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

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllFavs(data))
        return data;
    } else {
        const errors = await res.json()
        return errors
    }
}

//===============Lalos coffee.js code ==========================



//!--------------------------Luna---------------------------------
const GET_COFFEE = 'coffee/getCoffee';

const getCoffee = (payload) => {
    return {
        type: GET_COFFEE,
        payload
    }
};

export const getCoffeeThunk = (coffeeId) => async(dispatch) => {
    const res = await fetch(`/api/coffees/${coffeeId}`);
    if (res.ok) {
        const coffee = await res.json();
        dispatch(getCoffee(coffee));
        return coffee;
    } else {
        const err = await res.json();
        return err;
    }
}

//!--------------------------Luna---------------------------------
const initialState = {}

export default function coffeeReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_IMAGE:
            return { ...state, ImageUrls: action.payload }
        //? Chris /////////////////////////////////////////////////////////////////////////////////////
        case GET_ALL_COFFEES: {
            const newState = { ...state }
            action.payload.forEach((coffee) => {
                if (state[coffee.id]) {
                    newState[coffee.id] = { ...state[coffee.id], ...coffee }
                } else {
                    newState[coffee.id] = coffee
                }
            })
            return newState
        }
        //? Chris /////////////////////////////////////////////////////////////////////////////////////
        //===================Lalos reducer code========================
        case GET_ALL_FAVS:
            return { ...state, favorites: [...action.payload] }
        //===================Lalos reducer code========================

 //!--------------------------Luna---------------------------------
        case GET_COFFEE: {
            const newState = {...state};
            const coffee = action.payload;
            if (state[coffee.id]) {
                newState[coffee.id] = {...state[coffee.id], ...coffee};
            } else {
                newState[coffee.id] = coffee;
            }

            return newState;
        }
//!--------------------------Luna---------------------------------
        default:
            return state
    }
}
